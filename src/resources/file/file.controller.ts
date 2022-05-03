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

	/**
	 * @openapi
	 * /api/file/upload/{selector}:
	 *  post:
	 *    tags:
	 *    - FileController
	 *    summary: Upload file
	 *    parameters:
	 *      - name: selector
	 *        in: path
	 *        required: true
	 *        type: string
	 *        description: Selector of the directory
	 *    requestBody:
	 *      content:
	 *        multipart/form-data:
	 *          schema:
	 *            type: object
	 *            properties:
	 *              file:
	 *                type: string
	 *                format: binary
	 *    responses:
	 *      200:
	 *        description: File uploaded
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                message:
	 *                  type: string
	 *                fileId:
	 *                  type: string
	 *      400:
	 *        description: Bad request
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              $ref: '#/components/schemas/BaseRequest'
	 */
	private uploadFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = {
				file: req.file,
				selector: req.params.selector,
			};
			const message = await this.fileService.uploadFile(payload);
			return res.status(200).json(message);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};

	/**
	 *
	 * @openapi
	 * /api/file/download/{selector}/{fileId}:
	 *  get:
	 *    tags:
	 *     - FileController
	 *    summary: Download file
	 *    parameters:
	 *      - name: selector
	 *        in: path
	 *        required: true
	 *        type: string
	 *        description: Directory selector
	 *      - name: fileId
	 *        in: path
	 *        required: true
	 *        type: string
	 *        description: File id
	 *    security: []
	 *    responses:
	 *      200:
	 *        description: File downloaded
	 *      400:
	 *        description: Bad request
	 */
	private downloadFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = {
				selector: req.params.selector,
				fileId: req.params.fileId,
			};
			const file = await this.fileService.downloadFile(payload);
			return res.sendFile(file.path, file.filename);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default FileController;
