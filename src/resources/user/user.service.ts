import CreateUserPayload from './model/create-user-payload.model';
import userSchema from './user.schema';
import Response from '../../utils/models/response.model';
import bcryptjs from 'bcryptjs';
import Logger from '../../logger/logger';

class UserService {
	private user = userSchema;
	private logger = new Logger('UserService');

	public async createUser(payload: CreateUserPayload): Promise<Response | Error> {
		try {
			this.logger.info('Creating user');
			const hashedPassword = await bcryptjs.hash(payload.password, 10);
			const user = await this.user.create({
				username: payload.username,
				password: hashedPassword,
			});

			this.logger.info('User created');
			return {
				message: 'User created successfully',
				object: user,
			};
		} catch (error: any) {
			this.logger.error(error.message);
			throw new Error(error.message);
		}
	}
}

export default UserService;
