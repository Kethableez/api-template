import TokenStorage from '../model/token-storage.model';
import crypto from 'crypto';

export function isTokenExpired(token: TokenStorage): boolean {
	return new Date() >= token.expiresAt;
}

export function isTokenActive(token: TokenStorage): boolean {
	return !token.revokedAt && !isTokenExpired(token);
}

export function createToken(): string {
	return crypto.randomUUID();
}
