import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import Logger from '../logger/logger';
import HttpException from '../utils/models/http-exception.model';

export function environmentLock(req: Request, res: Response, next: NextFunction): void {
	const logger = new Logger('EnvironmentLock');
	if (config.server.mode === 'development') {
		logger.warn('Environment is in development mode, skipping environment lock');
		next();
	} else {
		logger.error('Environment is in production mode, applying environment lock');
		next(new HttpException(403, 'Forbidden due to environment lock'));
	}
}
