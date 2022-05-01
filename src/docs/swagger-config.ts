import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: version,
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

	console.log(`Docs available at http://localhost:${port}/api/docs`);
}

export default swaggerDocs;
