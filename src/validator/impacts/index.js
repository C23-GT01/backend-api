const { ImpactPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ImpactsValidator = {
  validateImpactPayload: (payload) => {
    const validationResult = ImpactPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ImpactsValidator;
