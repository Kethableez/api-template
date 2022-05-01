import BaseResponse from './base-response.model';

/**
 * @openapi
 * components:
 *  schemas:
 *    Response:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        object:
 *          type: object
 */
interface Response extends BaseResponse {
	object: any;
}

export default Response;
