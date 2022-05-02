/* eslint-disable no-console */
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import responseTime from 'response-time';
import config from './config/config';
import swaggerDocs from './docs/swagger-config';
import corsMiddleware from './middleware/cors.middleware';
import errorMiddleware from './middleware/error.middleware';
import { monitorResponseTime } from './middleware/response-time.middleware';
import Controller from './utils/models/controller.model';
import chalk from 'chalk';
import figlet from 'figlet';

class Server {
	public express: Application;
	public port: number;

	constructor(controllers: Controller[], port: number) {
		this.express = express();
		this.port = port;

		console.log(this.metaInfo);

		this.initializeDatabaseConnection();
		this.initializeMiddlewares();
		this.initializeSwagger();
		this.initializeControllers(controllers);
		this.initializeErrorHandlers();
	}

	public listen(): void {
		this.express.listen(this.port, () => {
			const infoString =
				chalk.black.bold.bgCyan('Server:') + chalk.cyan.underline(` http://localhost:${this.port}/api`);
			const infoString2 = chalk.black.bold.bgMagenta('Grafana:') + chalk.magenta.underline(' http://localhost:3000');
			console.log(infoString2);
			console.log(infoString);
		});
	}

	private get metaInfo() {
		return figlet.textSync('API v1.0', {
			font: 'Larry 3D',
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 80,
			whitespaceBreak: true,
		});
	}

	private initializeDatabaseConnection(): void {
		const url = config.server.docker ? config.mongo.remoteUrl : config.mongo.localUrl;
		mongoose
			.connect(url, config.mongo.options)
			.catch((err: unknown) => console.log(`Error connecting to database: ${err}`));
	}

	private initializeMiddlewares(): void {
		this.express.use(helmet());
		this.express.use(cors(config.cors));
		this.express.use(corsMiddleware.resourcePass);
		this.express.use(corsMiddleware.optionSkip);
		this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
		this.express.use(bodyParser.json({ limit: '10mb' }));
		this.express.use(responseTime(monitorResponseTime));
		this.express.use(morgan('dev'));
		this.express.use(compression());
		this.express.use(cookieParser());
	}

	private initializeControllers(controllers: Controller[]): void {
		controllers.forEach((controller: Controller) => this.express.use('/api', controller.router));
	}

	private initializeErrorHandlers(): void {
		this.express.use(errorMiddleware.notFoundHandler);
		this.express.use(errorMiddleware.errorHandler);
	}

	private initializeSwagger(): void {
		swaggerDocs(this.express, this.port);
	}
}

export default Server;
