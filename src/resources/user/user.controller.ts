import express, { Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import Controller from "../../utils/models/controller.model";
import HttpException from "../../utils/models/http-exception.model";
import UserService from "./user.service";
import user from "./helpers/user.validator";

class UserController implements Controller {
  public path = "/user";
  public router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, validationMiddleware(user.createUserValidator), this.createUser);
  }

  /**
   * @openapi
   * /api/user/register:
   *  post:
   *    tags:
   *    - UserController
   *    summary: Register user
   *    requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserPayload'
   *    security: []
   *    responses:
   *      200:
   *        description: User created successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Response'
   *      400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BaseResponse'
   */
  private createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
