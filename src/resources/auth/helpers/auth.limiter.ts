import LimiterOptions from '../../../utils/models/limiter-options.model';

const authLimiter: LimiterOptions = {
	windowMs: 60 * 60 * 1000,
	max: 5,
};

export default authLimiter;
