/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserPayload:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 */
interface CreateUserPayload {
  username: string;
  password: string;
}

export default CreateUserPayload;
