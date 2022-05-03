import mongoose, { Schema } from 'mongoose';
import File from './model/file.model';

/**
 * @openapi
 * components:
 *  schemas:
 *    File:
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
const FileSchema = new Schema({
	filename: { type: String, required: true },
	mimetype: { type: String, required: true },
	dirSelector: { type: String, required: true },
});

export default mongoose.model<File>('FileSchema', FileSchema);
