import DynamicConfig from '../../config/dynamic-config';
import Logger from '../../logger/logger';
import BaseResponse from '../../utils/models/base-response.model';
import ConfigKey from './model/config-key.model';

class ConfigService {
	private dynamicConfig = new DynamicConfig();
	private logger = new Logger('ConfigService');

	public async setConfig(key: ConfigKey, value: string): Promise<BaseResponse | Error> {
		try {
			this.logger.info(`Setting config ${key} to ${value}`);
			this.dynamicConfig.setConfig(key, value);

			this.logger.info('Config set successfully');
			return { message: 'Config changed successfully' };
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}

	public async getConfig(): Promise<any | Error> {
		try {
			this.logger.info('Getting config');
			const config = this.dynamicConfig.getConfigs();

			this.logger.info('Config retrieved successfully');
			return config;
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}
}

export default ConfigService;
