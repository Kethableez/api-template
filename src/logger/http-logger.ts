import winston, { createLogger, transports, format } from 'winston';
import { logFormat } from '../utils/helpers/log-format.helper';

class HttpLogger {
	private logger: winston.Logger;

	constructor() {
		const date = new Date().toISOString().split('T')[0];

		this.logger = createLogger({
			transports: [
				new transports.Console({}),
				new transports.File({
					dirname: 'log',
					filename: `${date}-http.log`,
				}),
			],
			format: format.combine(format.timestamp(), format.label({ label: 'HTTP' }), format.colorize(), logFormat),
		});
	}

	public info(message: string) {
		this.logger.info(message);
	}

	public error(message: string) {
		this.logger.error(message);
	}

	public warn(message: string) {
		this.logger.warn(message);
	}

	public stream = {
		write: (message: string) => {
			this.logger.info(message.substring(0, message.lastIndexOf('\n')));
		},
	};
}

export default HttpLogger;
