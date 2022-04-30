import ConfigKey from "./config-key.model";

interface ConfigRequest {
  key: ConfigKey;
  value: string;
}

export default ConfigRequest;
