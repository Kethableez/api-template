import DynamicConfig from '../../config/dynamic-config';
import BaseResponse from '../../utils/models/base-response.model';
import { configMapper } from './helpers/config-mapper';
import ConfigKey from './model/config-key.model';

class ConfigService {
	private dynamicConfig = new DynamicConfig();

	public async setConfig(key: ConfigKey, value: string): Promise<BaseResponse | Error> {
		try {
			this.dynamicConfig.setConfig(key, value);

			return { message: 'Config changed successfully' };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	public async getConfig(): Promise<any | Error> {
		try {
			const config = this.dynamicConfig.getConfigs();

			return config;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}

export default ConfigService;
