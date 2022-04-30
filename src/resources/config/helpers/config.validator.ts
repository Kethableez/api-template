import Joi from "joi";

const setConfigValidator = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});

export default { setConfigValidator };
