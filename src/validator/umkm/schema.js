const Joi = require('joi');

const UmkmPayloadSchema = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  location: Joi.object().required(),
  history: Joi.object().allow(null),
  impact: Joi.array().allow(null),
  contact: Joi.array().allow(null),
});

module.exports = { UmkmPayloadSchema };
