const { ProductPayloadSchema } = require('./schema');

const ProductsValidator = {
  validateProductPayload: (payload) => {
    const validationResult = ProductPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = ProductsValidator;
