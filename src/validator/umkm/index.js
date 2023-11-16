const { UmkmPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UmkmValidator = {
  validateUmkmPayload: (payload) => {
    const validationResult = UmkmPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UmkmValidator;
