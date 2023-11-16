const Joi = require('joi');

const ProductPayloadSchema = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.string().required(),
  umkm: Joi.array().items(Joi.string()).required(),
});

module.exports = { ProductPayloadSchema };
