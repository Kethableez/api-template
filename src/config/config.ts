import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 9000;
const SERVER_MODE = process.env.NODE_ENV || 'development';

const MONGO_LOCAL_HOST = process.env.MONGO_LOCAL_HOST;
const MONGO_LOCAL_PORT = process.env.MONGO_LOCAL_PORT;
const MONGO_LOCAL_NAME = process.env.MONGO_LOCAL_NAME;

const MONGO_REMOTE_HOST = process.env.MONGO_REMOTE_HOST;
const MONGO_REMOTE_PORT = process.env.MONGO_REMOTE_PORT;
const MONGO_REMOTE_NAME = process.env.MONGO_REMOTE_NAME;

const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'any-travel-issuer';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'any-travel-jwt-secret';
const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || '30m';

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	autoIndex: false,
	retryWrites: false,
};

const CORS = {
	origin: ['http://localhost', 'http://localhost:4200'],
	allowedHeaders: 'Content-Type,Authorization',
	credentials: true,
	methods: 'GET, POST',
	preflightContinue: true,
	maxAge: 3600,
};

const HELMET = {
	crossOriginEmbedderPolicy: false,
};

const AUTH = {
	expireTime: TOKEN_EXPIRETIME,
	issuer: TOKEN_ISSUER,
	secret: TOKEN_SECRET,
};

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	mode: SERVER_MODE || 'development',
	docker: process.env.DOCKER === 'true' || false,
};

const MONGO = {
	options: MONGO_OPTIONS,
	localUrl: `mongodb://${MONGO_LOCAL_HOST}:${MONGO_LOCAL_PORT}/${MONGO_LOCAL_NAME}`,
	remoteUrl: `mongodb://${MONGO_REMOTE_HOST}:${MONGO_REMOTE_PORT}/${MONGO_REMOTE_NAME}`,
};

const config = {
	server: SERVER,
	mongo: MONGO,
	cors: CORS,
	helmet: HELMET,
	auth: AUTH,
};

export default config;
