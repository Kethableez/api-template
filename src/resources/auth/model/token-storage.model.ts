import { Document } from 'mongoose';

interface TokenStorage extends Document {
	userId: string;
	token: string;
	expiresAt: Date;
	createdAt: Date;
	revokedAt: Date;
	replaced: string;
}

export default TokenStorage;
