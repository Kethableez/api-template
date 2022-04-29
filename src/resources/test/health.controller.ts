import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/models/http-exception.model";
import HealthService from "./health.service";

class HealthController {
  private path = "/health";
  private router = express.Router();
  private healthService = new HealthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/ping`, this.ping);
  }

  private ping = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.healthService.ping();
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
