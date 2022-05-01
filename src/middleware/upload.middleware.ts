import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { getFilePath } from '../functions/file-path.function';

const MAX_SIZE = 1024 * 1024 * 10;
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const filePath = getFilePath(req.params.selector);
		if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
		cb(null, filePath);
	},
	filename: (req, file, cb) => {
		const filename = [Date.now(), file.originalname].join('-');
		cb(null, filename);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
			throw new Error('Invalid file type');
		}
	},
	limits: { fileSize: MAX_SIZE },
}).single('file');

const fakeUpload = (req: Request, res: Response, next: NextFunction) => {
	next();
};

export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
	if (process.env.API_ALLOW_FILE_UPLOAD === 'true') return upload(req, res, next);
	else return fakeUpload(req, res, next);
}
