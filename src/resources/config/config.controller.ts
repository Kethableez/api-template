import express, { Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import Controller from "../../utils/models/controller.model";
import HttpException from "../../utils/models/http-exception.model";
import ConfigService from "./config.service";
import config from "./helpers/config.validator";

class ConfigController implements Controller {
  public path = "/config";
  public router = express.Router();
  private configService = new ConfigService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.getConfig);
    this.router.post(`${this.path}`, validationMiddleware(config.setConfigValidator), this.setConfig);
  }

  /**
   * @openapi
   *  /api/config:
   *    get:
   *      tags:
   *      - config
   *      description: Get current api configs
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
   *      - config
   *      summary: Set config
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                key:
   *                  type: string
   *                value:
   *                  type: string
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
