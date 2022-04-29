import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export const createAuthToken = (payload: any) => {
  return jwt.sign(payload, config.auth.secret, {
    issuer: config.auth.issuer,
    expiresIn: config.auth.expireTime,
  });
};

export const validateToken = async (
  token: string
): Promise<jwt.VerifyErrors | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.auth.secret, (err, paylaod) => {
      if (err) return reject(err);
      resolve(paylaod as JwtPayload);
    });
  });
};
