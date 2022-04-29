import rateLimiter from "express-rate-limit";

export const limiterMiddleware = (limiterOptions: LimiterOptions) =>
  rateLimiter({
    windowMs: limiterOptions.windowMs,
    max: limiterOptions.max,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (request, response, next, options) =>
      response.status(options.statusCode).json({ message: options.message }),
    skip: () => process.env.API_USE_LIMITER === "false",
  });
