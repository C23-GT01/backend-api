class ImpactsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postImpactHandler(request, h) {
    this._validator.validateImpactPayload(request.payload);
    const {
      name, image, description,
    } = request.payload;

    const { id: owner } = request.auth.credentials;

    const impactId = await this._service.addImpact({
      name,
      image,
      description,
      owner,
    });

    const response = h.response({
      error: false,
      status: 'success',
      message: 'Impact berhasil ditambahkan',
      data: {
        impactId,
      },
    });
    response.code(201);
    return response;
  }

  async getAllImpactsHandler(request) {
    const { id: owner } = request.auth.credentials;
    const impacts = await this._service.getImpacts(owner);
    return {
      error: false,
      status: 'success',
      message: 'Menampilkan semua impact',
      count: impacts.length,
      data: {
        impacts,
      },
    };
  }

  async getAllImpactsApproveHandler(request) {
    const { bool } = request.params;

    const isApproved = bool === 'true';

    const impacts = await this._service.getImpactsApprove(isApproved);
    return {
      error: false,
      status: 'success',
      message: 'Menampilkan impact filter by approve',
      count: impacts.length,
      data: {
        impacts,
      },
    };
  }

  async getImpactByIdHandler(request, h) {
    const { id } = request.params;

    const impact = await this._service.getImpactById(id);

    return {
      error: false,
      status: 'success',
      data: {
        impact,
      },
    };
  }

  async putImpactByIdHandler(request, h) {
    this._validator.validateImpactPayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyImpactOwner(id, credentialId);

    await this._service.editImpactById(id, request.payload);

    return {
      error: false,
      status: 'success',
      message: 'Impact berhasil diperbarui',
    };
  }

  async putImpactApproveByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyIsAdmin(credentialId);

    await this._service.editImpactAprroveById(id);

    return {
      error: false,
      status: 'success',
      message: 'Impact Approve diubah',
    };
  }

  async deleteImpactByIdHandler(request, h) {
    const { id } = request.params;

    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyImpactOwner(id, credentialId);

    await this._service.deleteImpactById(id);

    return {
      error: false,
      status: 'success',
      message: 'Impact berhasil dihapus',
    };
  }
}

module.exports = ImpactsHandler;
