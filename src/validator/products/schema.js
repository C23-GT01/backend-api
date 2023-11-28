const Joi = require('joi');

const ProductPayloadSchema = Joi.object({
  image: Joi.array().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow(null),
  resources: Joi.array().allow(null),
  production: Joi.array().allow(null),
  impact: Joi.array().allow(null),
  contribution: Joi.array().allow(null),
  category: Joi.number().allow(null),
});

module.exports = { ProductPayloadSchema };
