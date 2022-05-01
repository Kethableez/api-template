import { CookieOptions, Response } from "express";
import { createAuthToken } from "../../functions/auth-token.function";
import BaseResponse from "../../utils/models/base-response.model";
import userSchema from "../user/user.schema";
import { createToken, isTokenActive } from "./helpers/auth.helpers";
import AuthResponse from "./model/auth-response.model";
import LoginPayload from "./model/login-payload.model";
import RefreshPayload from "./model/refresh-payload.model";
import TokenStorage from "./model/token-storage.model";
import tokenStorageSchema from "./token-storage.schema";
import bcryptjs from "bcryptjs";

class AuthService {
  private tokenStorage = tokenStorageSchema;
  private user = userSchema;

  public async login(res: Response, payload: LoginPayload): Promise<AuthResponse | Error> {
    try {
      const { username, password } = payload;
      const user = await this.user.findOne({ username });

      if (!user) throw new Error("User not found");

      if (!(await bcryptjs.compare(password, user.password))) throw new Error("Password is incorrect");

      const userId = user._id.toString();
      const authToken = createAuthToken({ userId: userId });
      const refreshToken = await this.saveRefreshToken(userId);

      const response = {
        userId: userId,
        authToken: authToken,
      };

      this.setCookie(res, refreshToken.token, refreshToken.expiresAt);

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async refresh(res: Response, payload: RefreshPayload): Promise<AuthResponse | Error> {
    try {
      const { token } = payload;

      const refreshToken = await this.getRefreshToken(token);
      const userId = refreshToken.userId;

      const authToken = createAuthToken({ userId: userId });

      const response = {
        userId: userId,
        authToken: authToken,
      };

      this.setCookie(res, refreshToken.token, refreshToken.expiresAt);

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async logout(res: Response, payload: RefreshPayload): Promise<BaseResponse | Error> {
    try {
      const { token } = payload;
      const refreshToken = await this.getRefreshToken(token);
      refreshToken.revokedAt = new Date();
      await refreshToken.save();
      this.clearCookie(res);

      return { message: "Token revoked" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private setCookie(res: Response, token: string, expires: Date): void {
    const options: CookieOptions = {
      expires: expires,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("token", token, options);
  }

  private clearCookie(res: Response): void {
    res.clearCookie("refreshToken");
  }

  private async saveRefreshToken(userId: string): Promise<TokenStorage> {
    return this.tokenStorage.create({
      userId: userId,
      token: createToken(),
      createdAt: new Date(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
  }

  private async getRefreshToken(token: string): Promise<TokenStorage> {
    try {
      const refreshToken = await this.tokenStorage.findOne({ token: token });
      if (!refreshToken || !isTokenActive(refreshToken)) throw new Error("Invalid token");
      return refreshToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
