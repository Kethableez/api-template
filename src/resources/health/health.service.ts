import BaseResponse from '../../utils/models/base-response.model';

class HealthService {
	public async ping(): Promise<BaseResponse | Error> {
		try {
			return { message: 'Pong!' };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}

export default HealthService;
