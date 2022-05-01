import express, { Request, Response, NextFunction } from 'express';
import validationMiddleware from '../../middleware/validation.middleware';
import auth from './helpers/auth.validator';
import Controller from '../../utils/models/controller.model';
import HttpException from '../../utils/models/http-exception.model';
import AuthService from './auth.service';
import { limiterMiddleware } from '../../middleware/limiter.middleware';
import authLimiter from './helpers/auth.limiter';

class AuthController implements Controller {
	public path = '/auth';
	public router = express.Router();
	private authService = new AuthService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.post(
			`${this.path}/login`,
			limiterMiddleware(authLimiter),
			validationMiddleware(auth.loginValidator),
			this.login
		);
		this.router.post(`${this.path}/refresh`, limiterMiddleware(authLimiter), this.refresh);
		this.router.post(`${this.path}/logout`, this.logout);
	}

	/**
	 * @openapi
	 *  /api/auth/login:
	 *    post:
	 *      tags:
	 *      - AuthController
	 *      summary: Login
	 *      requestBody:
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/LoginPayload'
	 *      security: []
	 *      responses:
	 *        200:
	 *          description: Login success
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/AuthResponse'
	 *          headers:
	 *            Set-Cookie:
	 *              schema:
	 *                type: string
	 *                example: refreshToken=123123123; HttpOnly; Secure; SameSite=Strict
	 *        400:
	 *          description: Bad request
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/BaseResponse'
	 */
	private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const payload = req.body;
			const response = await this.authService.login(res, payload);

			res.status(200).json(response);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};

	/**
	 *
	 * @openapi
	 * /api/auth/refresh:
	 *  post:
	 *    tags:
	 *    - AuthController
	 *    summary: Refresh auth token
	 *    security:
	 *      - cookieAuth: []
	 *    responses:
	 *      200:
	 *        description: Refresh success
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/AuthResponse'
	 *      400:
	 *        description: Bad request
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/BaseResponse'
	 *
	 */
	private refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const token = req.cookies.refreshToken;

			const response = await this.authService.refresh(res, { token });

			res.status(200).json(response);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};

	/**
	 * @openapi
	 * /api/auth/logout:
	 *  post:
	 *    tags:
	 *    - AuthController
	 *    summary: Logout
	 *    security:
	 *      - cookieAuth: []
	 *    responses:
	 *      200:
	 *        description: Logout success
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/BaseResponse'
	 *      400:
	 *        description: Bad request
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/BaseResponse'
	 */
	private logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const token = req.cookies.refreshToken;

			const response = await this.authService.logout(res, { token });
			res.status(200).json(response);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default AuthController;
