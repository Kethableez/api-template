import Controller from '../../utils/models/controller.model';
import express, { Request, Response, NextFunction } from 'express';
import FileService from './file.service';
import { uploadMiddleware } from '../../middleware/upload.middleware';
import HttpException from '../../utils/models/http-exception.model';

class FileController implements Controller {
	public path = '/file';
	public router = express.Router();
	private fileService = new FileService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/upload/:selector`, uploadMiddleware, this.uploadFile);
		this.router.get(`${this.path}/download/:selector/:fileId`, this.downloadFile);
	}

	private uploadFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const message = await this.fileService.uploadFile({ selector: req.params.selector, file: req.file });
			return res.status(200).json(message);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};

	private downloadFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const file = await this.fileService.downloadFile({ selector: req.params.selector, fileId: req.params.fileId });
			return res.download(file.path, file.filename);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default FileController;
