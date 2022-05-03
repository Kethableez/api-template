import { getFilePath } from '../../functions/file-path.function';
import Logger from '../../logger/logger';
import fileSchema from './file.schema';
import FileUploadPayload from './model/file-upload-payload.model';
import FileResponse from './model/file-response.model';
import FileDownloadPayload from './model/file-download-payload.model';

class FileService {
	private file = fileSchema;
	private logger = new Logger('File');

	public async uploadFile(payload: FileUploadPayload): Promise<FileResponse | Error> {
		try {
			this.logger.info(`Attempt to upload file: ${payload.file?.filename}`);

			const { selector, file } = payload;

			if (!selector) throw new Error('Selector is required');
			if (!file) throw new Error('File is required');

			const newFile = await this.file.create({
				filename: file.filename,
				mimetype: file.mimetype,
				dirSelector: selector,
			});

			this.logger.info(`File uploaded with id ${newFile._id}`);
			return {
				message: 'File uploaded successfully',
				fileId: newFile._id,
			};
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}

	public async downloadFile(payload: FileDownloadPayload): Promise<any | Error> {
		try {
			this.logger.info(`Attempt to download file: ${payload.fileId}`);

			const { selector, fileId } = payload;

			if (!selector) throw new Error('Selector is required');
			if (!fileId) throw new Error('File id is required');

			const file = await this.file.findById(fileId);
			if (!file) throw new Error('File not found');

			this.logger.info(`Downloading file ${file.filename}}`);
			return {
				path: getFilePath(file.dirSelector, file.filename),
				filename: file.filename,
			};
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}
}

export default FileService;
