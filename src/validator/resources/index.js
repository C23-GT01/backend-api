const { ResourcePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ResourcesValidator = {
  validateResourcePayload: (payload) => {
    const validationResult = ResourcePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ResourcesValidator;
