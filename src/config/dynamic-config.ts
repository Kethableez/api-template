import ConfigKey from '../resources/config/model/config-key.model';

class DynamicConfig {
	public configKeys: ConfigKey[];

	constructor() {
		this.configKeys = Object.values(ConfigKey);
	}

	public getConfigs() {
		return Object.fromEntries(this.configKeys.map((key) => [key, process.env[key]]));
	}

	public setConfig(key: ConfigKey, value: string) {
		if (!this.configKeys.includes(key)) {
			throw new Error(`Invalid config key: ${key}`);
		}
		if (typeof value !== 'string') {
			throw new Error(`Invalid config value: ${value}`);
		}
		process.env[key] = value;
	}

	public getConfig(key: ConfigKey) {
		return process.env[key];
	}
}

export default DynamicConfig;
