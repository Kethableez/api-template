import express, { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import Controller from '../../utils/models/controller.model';
import HttpException from '../../utils/models/http-exception.model';
import ConfigService from './config.service';
import config from './helpers/config.validator';

class ConfigController implements Controller {
	public path = '/config';
	public router = express.Router();
	private configService = new ConfigService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(`${this.path}`, authMiddleware, this.getConfig);
		this.router.post(`${this.path}`, authMiddleware, validationMiddleware(config.setConfigValidator), this.setConfig);
	}

	/**
	 * @openapi
	 *  /api/config:
	 *    get:
	 *      tags:
	 *      - ConfigController
	 *      summary: Get configs
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Current api configs
	 */
	private getConfig = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const config = await this.configService.getConfig();
			res.status(200).json(config);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};

	/**
	 * @openapi
	 *  /api/config:
	 *    post:
	 *      tags:
	 *      - ConfigController
	 *      summary: Set config
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/ConfigRequest'
	 *      security:
	 *        - bearerAuth: []
	 *      responses:
	 *        200:
	 *          description: Config set
	 */
	private setConfig = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { key, value } = req.body;
			const response = await this.configService.setConfig(key, value);
			res.status(200).json(response);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default ConfigController;
