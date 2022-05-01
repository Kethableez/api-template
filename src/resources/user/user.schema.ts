import mongoose, { Schema } from 'mongoose';
import User from './model/user.model';

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 */
const UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
});

export default mongoose.model<User>('UserSchema', UserSchema);
