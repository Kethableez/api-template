import { Document } from 'mongoose';

interface File extends Document {
	filename: string;
	ext: string;
	mimetype: string;
	dirSelector: string;
}

export default File;
