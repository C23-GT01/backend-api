const Joi = require('joi');

const ResourcePayloadSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.object().required(),
  umkm: Joi.string().allow(null),
  description: Joi.string().allow(null),
});

module.exports = { ResourcePayloadSchema };
