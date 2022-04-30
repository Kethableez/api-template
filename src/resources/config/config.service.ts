import BaseResponse from "../../utils/models/base-response.model";
import { configMapper } from "./helpers/config-mapper";
import ConfigKey from "./model/config-key.model";

class ConfigService {
  private configKeys = Object.values(ConfigKey);

  public async setConfig(key: ConfigKey, value: string): Promise<BaseResponse | Error> {
    try {
      if (!this.configKeys.includes(key)) {
        throw new Error(`Invalid config key: ${key}`);
      }
      if (typeof value !== "string") {
        throw new Error(`Invalid config value: ${value}`);
      }

      process.env[key] = value;

      return { message: "Value changed successfully" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getConfig(): Promise<any | Error> {
    try {
      const config = configMapper(this.configKeys);

      return config;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default ConfigService;
