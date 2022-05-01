import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/models/http-exception.model';

function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
	next({ status: 404, message: 'Not found' });
}

function errorHandler(error: HttpException, req: Request, res: Response, next: NextFunction) {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong';

	res.status(status).json({
		message: message,
	});
}

export default {
	notFoundHandler,
	errorHandler,
};
