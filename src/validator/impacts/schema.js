const Joi = require('joi');

const ImpactPayloadSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().allow(null),
});

module.exports = { ImpactPayloadSchema };
