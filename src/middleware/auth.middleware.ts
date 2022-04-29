import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { validateToken } from "../functions/auth-token.function";
import { HttpException } from "../utils/models/http-exception.model";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return next(new HttpException(401, "Unauthorized `"));
  }
  const accessToken = token.split(" ")[1];
  try {
    const payload = await validateToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised 2"));
    }

    return next();
  } catch (error: any) {
    return next(new HttpException(401, error.message));
  }
}
