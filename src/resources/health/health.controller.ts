import express, { NextFunction, Request, Response } from "express";
import { limiterMiddleware } from "../../middleware/limiter.middleware";
import Controller from "../../utils/models/controller.model";
import HttpException from "../../utils/models/http-exception.model";
import HealthService from "./health.service";

class HealthController implements Controller {
  public path = "/health";
  public router = express.Router();
  private healthService = new HealthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/ping`,
      limiterMiddleware({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1,
      }),
      this.ping
    );
  }

  /**
   * @openapi
   *  /api/health/ping:
   *    get:
   *      tags:
   *      - healthcheck
   *      description: Check if the server is running
   *      responses:
   *        200:
   *          description: Server is running
   */
  private ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.healthService.ping();
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default HealthController;
