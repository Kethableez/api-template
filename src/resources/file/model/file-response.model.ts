import BaseResponse from '../../../utils/models/base-response.model';

interface FileResponse extends BaseResponse {
	fileId: string;
}

export default FileResponse;
