import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import Logger from '../logger/logger';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const logger = new Logger('Validation');
		const validationOptions = {
			abortEarly: false,
			allowUnknown: true,
			stripUnknown: true,
		};

		try {
			const value = await schema.validateAsync(req.body, validationOptions);
			req.body = value;
			next();
		} catch (error: any) {
			const errors: string[] = [];
			error.details.forEach((error: Joi.ValidationErrorItem) => {
				errors.push(error.message);
			});
			logger.error(errors.join(', '));
			res.status(400).json({ errors: errors });
		}
	};
}

export default validationMiddleware;
