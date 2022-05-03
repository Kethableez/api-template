interface FileUploadPayload {
	file: Express.Multer.File | undefined;
	selector: string;
}

export default FileUploadPayload;
