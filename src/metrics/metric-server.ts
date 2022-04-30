import express, { Application } from "express";
import client from "prom-client";

class MetricServer {
  public express: Application;
  public port: number;

  constructor(port: number) {
    this.express = express();
    this.port = port;

    this.collectMetrics();
    this.initializeMetrics();
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log(`Metrics server started at: http://localhost:${this.port}/metrics`);
    });
  }

  private initializeMetrics() {
    this.express.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);

      return res.send(await client.register.metrics());
    });
  }

  private collectMetrics() {
    client.collectDefaultMetrics();
  }
}

export default MetricServer;
