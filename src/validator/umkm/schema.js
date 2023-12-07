const Joi = require('joi');

const UmkmPayloadSchema = Joi.object({
  image: Joi.string().allow(null),
  logo: Joi.string().allow(null),
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  location: Joi.object().allow(null),
  history: Joi.object().allow(null),
  impact: Joi.array().allow(null),
  contact: Joi.array().allow(null),
  employe: Joi.number().allow(null),
});

module.exports = { UmkmPayloadSchema };
