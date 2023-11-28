const ClientError = require('../../exceptions/ClientError');

class ResourcesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postResourceHandler = this.postResourceHandler.bind(this);
    this.getAllResourcesHandler = this.getAllResourcesHandler.bind(this);
    this.getResourceByIdHandler = this.getResourceByIdHandler.bind(this);
    this.putResourceByIdHandler = this.putResourceByIdHandler.bind(this);
    this.deleteResourceByIdHandler = this.deleteResourceByIdHandler.bind(this);
  }

  async postResourceHandler(request, h) {
    try {
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
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
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
    try {
      const { id } = request.params;

      const resource = await this._service.getResourceById(id);

      return {
        error: false,
        status: 'success',
        data: {
          resource,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putResourceByIdHandler(request, h) {
    try {
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
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteResourceByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyResourceOwner(id, credentialId);

      await this._service.deleteResourceById(id);

      return {
        error: false,
        status: 'success',
        message: 'Resource berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami...',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ResourcesHandler;
