import { NextFunction, Request, Response } from 'express';
import Logger from '../logger/logger';
import HttpException from '../utils/models/http-exception.model';
import Role from '../utils/models/role.model';

export function roleMiddleware(role: Role) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const logger = new Logger('RoleMiddleware');
		const userRole = res.locals?.user?.role || Role.GUEST;
		if (userRole === role) {
			logger.info('User role is valid');
			next();
		} else {
			logger.error('User role is invalid');
			next(new HttpException(403, 'Forbidden due to lack of privileges'));
		}
	};
}
