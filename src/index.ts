import config from "./config/config";
import MetricServer from "./metrics/metric-server";
import AuthController from "./resources/auth/auth.controller";
import ConfigController from "./resources/config/config.controller";
import HealthController from "./resources/health/health.controller";
import Server from "./server";

const server = new Server(
  [new ConfigController(), new HealthController(), new AuthController()],
  Number(config.server.port)
);
const metricServer = new MetricServer(9500);

server.listen();
metricServer.listen();
