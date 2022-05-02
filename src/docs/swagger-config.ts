/* eslint-disable no-console */
import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import chalk from 'chalk';

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.1',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
				cookieAuth: {
					type: 'apiKey',
					in: 'cookie',
					name: 'refreshToken',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
			{
				cookieAuth: [],
			},
		],
	},
	apis: [
		'./src/resources/**/*.controller.ts',
		'./src/resources/**/*.schema.ts',
		'./src/resources/**/model/*.model.ts',
		'./src/utils/models/*.model.ts',
		'./src/utils/models/*.schema.ts',
	],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Application, port: number) {
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
	const infoString =
		chalk.black.bold.bgBlue('Documentation:') + chalk.blue.underline(` http://localhost:${port}/api/docs`);
	// console.log(`Docs available at http://localhost:${port}/api/docs`);
	console.log(infoString);
}

export default swaggerDocs;
