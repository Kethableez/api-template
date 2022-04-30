import express, { Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import auth from "./helpers/auth.validator";
import Controller from "../../utils/models/controller.model";
import HttpException from "../../utils/models/http-exception.model";
import AuthService from "./auth.service";
import { limiterMiddleware } from "../../middleware/limiter.middleware";
import authLimiter from "./helpers/auth.limiter";

class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      limiterMiddleware(authLimiter),
      // validationMiddleware(auth.loginValidator),
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
   *      - auth
   *      summary: Login
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                username:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Login success
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

  private refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const token = req.cookies.refreshToken;

      const response = await this.authService.refresh(res, { token });

      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

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
