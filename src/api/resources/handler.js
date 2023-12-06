class ResourcesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postResourceHandler(request, h) {
    this._validator.validateResourcePayload(request.payload);
    const {
      name, image, location, umkm, description,
    } = request.payload;

    const { id: owner } = request.auth.credentials;

    const resourceId = await this._service.addResource({
      name,
      image,
      location,
      umkm,
      description,
      owner,
    });

    const response = h.response({
      error: false,
      status: 'success',
      message: 'Resource berhasil ditambahkan',
      data: {
        resourceId,
      },
    });
    response.code(201);
    return response;
  }

  async getAllResourcesHandler(request) {
    const { id: owner } = request.auth.credentials;
    const resources = await this._service.getResources(owner);
    return {
      error: false,
      status: 'success',
      message: 'Menampilkan semua resource',
      count: resources.length,
      data: {
        resources,
      },
    };
  }

  async getResourceByIdHandler(request, h) {
    const { id } = request.params;

    const resource = await this._service.getResourceById(id);

    return {
      error: false,
      status: 'success',
      data: {
        resource,
      },
    };
  }

  async putResourceByIdHandler(request, h) {
    this._validator.validateResourcePayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyResourceOwner(id, credentialId);

    await this._service.editResourceById(id, request.payload);

    return {
      error: false,
      status: 'success',
      message: 'Resource berhasil diperbarui',
    };
  }

  async deleteResourceByIdHandler(request, h) {
    const { id } = request.params;

    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyResourceOwner(id, credentialId);

    await this._service.deleteResourceById(id);

    return {
      error: false,
      status: 'success',
      message: 'Resource berhasil dihapus',
    };
  }
}

module.exports = ResourcesHandler;
