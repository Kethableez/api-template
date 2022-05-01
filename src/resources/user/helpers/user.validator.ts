import Joi from "joi";

const createUserValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default {
  createUserValidator,
};
