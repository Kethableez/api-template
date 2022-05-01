import ConfigKey from '../model/config-key.model';

export const configMapper = (configKeys: ConfigKey[]) => {
	return Object.fromEntries(configKeys.map((key) => [key, process.env[key]]));
};
