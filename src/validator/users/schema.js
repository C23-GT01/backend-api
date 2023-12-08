const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  image: Joi.string().allow(null),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
