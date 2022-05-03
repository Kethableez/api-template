import Logger from '../../logger/logger';
import BaseResponse from '../../utils/models/base-response.model';

class HealthService {
	private logger = new Logger('HealthService');

	public async ping(): Promise<BaseResponse | Error> {
		try {
			this.logger.info('Server pinging');
			return { message: 'Pong!' };
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}
}

export default HealthService;
