/**
 * @openapi
 * components:
 *  schemas:
 *    BaseResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */
interface BaseResponse {
  message: string;
}

export default BaseResponse;
