import mongoose, { Schema } from 'mongoose';
import File from './model/file.model';

const FileSchema = new Schema({
	filename: { type: String, required: true },
	mimetype: { type: String, required: true },
	dirSelector: { type: String, required: true },
});

export default mongoose.model<File>('FileSchema', FileSchema);
