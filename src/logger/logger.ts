import winston, { createLogger, transports, format } from 'winston';
import { logFormat } from '../utils/helpers/log-format.helper';

class Logger {
	private logger: winston.Logger;

	constructor(serviceName: string) {
		const date = new Date().toISOString().split('T')[0];

		this.logger = createLogger({
			transports: [
				new transports.Console({}),
				new transports.File({
					dirname: 'log',
					filename: `${date}-common.log`,
				}),
			],
			format: format.combine(format.timestamp(), format.label({ label: serviceName }), format.colorize(), logFormat),
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

export default Logger;
