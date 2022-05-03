import { format } from 'winston';

export const logFormat = format.printf(({ level, message, label, timestamp }) => {
	return `[${timestamp}] [${label}] [${level}]: ${message}`;
});
