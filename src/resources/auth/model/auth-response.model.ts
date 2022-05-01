/**
 * @openapi
 * components:
 *  schemas:
 *    AuthResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        authToken:
 *          type: string
 */
interface AuthResponse {
  userId: string;
  authToken: string;
}

export default AuthResponse;
