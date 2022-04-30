import client from "prom-client";

export const serverResponseTime = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "Rest response time in ms",
  labelNames: ["method", "route", "status_code"],
});
