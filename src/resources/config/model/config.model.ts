import ConfigKey from './config-key.model';
/**
 * @openapi
 * components:
 *  schemas:
 *    ConfigRequest:
 *      type: object
 *      properties:
 *        key:
 *          type: string
 *        value:
 *          type: string
 *
 */

interface ConfigRequest {
	key: ConfigKey;
	value: string;
}

export default ConfigRequest;
