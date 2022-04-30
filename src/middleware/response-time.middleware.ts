import { Request, Response } from "express";
import responseTime from "response-time";
import { serverResponseTime } from "../metrics/histograms/server-response-time";

export function monitorResponseTime(req: Request, res: Response, time: number) {
  if (req?.route?.path) {
    serverResponseTime.observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode,
      },
      time * 1000
    );
  }
}
