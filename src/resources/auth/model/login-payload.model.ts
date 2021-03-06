/**
 * @openapi
 * components:
 *  schemas:
 *    LoginPayload:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 */

interface LoginPayload {
  username: string;
  password: string;
}

export default LoginPayload;
