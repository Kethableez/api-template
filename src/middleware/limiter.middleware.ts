import rateLimiter from "express-rate-limit";
import config from "../config/config";
import LimiterOptions from "../utils/models/limiter-options.model";

export function limiterMiddleware(limiterOptions: LimiterOptions) {
  return rateLimiter({
    windowMs: limiterOptions.windowMs,
    max: limiterOptions.max,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response, next, options) =>
      response.status(options.statusCode).json({ message: options.message }),
    skip: () => process.env.API_USE_LIMITER === "false",
  });
}
