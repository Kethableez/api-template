import { getFilePath } from '../../functions/file-path.function';
import Logger from '../../logger/logger';
import fileSchema from './file.schema';

class FileService {
	private file = fileSchema;
	private logger = new Logger('File');

	public async uploadFile(payload: any): Promise<any | Error> {
		try {
			this.logger.info(`Attempt to upload file: ${payload.filename}`);

			const { selector, file } = payload;

			if (!selector) throw new Error('Selector is required');
			if (!file) throw new Error('File is required');

			await this.file.create({
				filename: file.filename,
				mimetype: file.mimetype,
				dirSelector: selector,
			});

			this.logger.info(`File uploaded with id ${file._id}`);
			return {
				message: 'File uploaded successfully',
				fileId: file._id,
			};
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}

	public async downloadFile(payload: any): Promise<any | Error> {
		try {
			this.logger.info(`Attempt to download file: ${payload.filename}`);

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
