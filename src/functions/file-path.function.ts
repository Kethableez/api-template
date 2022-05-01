import path from 'path';

const STORAGE = path.resolve(process.env.API_STORAGE_DIR || 'storage');

export const getFilePath = (selector: string, filename?: string) => {
	return filename ? path.join(STORAGE, selector, filename) : path.join(STORAGE, selector);
};
