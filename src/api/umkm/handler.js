class UMKMHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async getAllUmkmHandler() {
    const umkm = await this._service.getUmkm();
    return {
      error: false,
      message: 'Menampilkan semua UMKM',
      count: umkm.length,
      status: 'success',
      data: {
        umkm,
      },
    };
  }

  async getDetailUMKMHandler(request, h) {
    const { id } = request.params;

    const umkm = await this._service.getUmkmById(id);

    return {
      error: false,
      status: 'success',
      data: {
        umkm,
      },
    };
  }

  async postUMKMHandler(request, h) {
    this._validator.validateUmkmPayload(request.payload);
    const {
      image, logo, name, description, location,
      history, impact, contact, employe,
    } = request.payload;

    const { id: owner } = request.auth.credentials;

    const umkmId = await this._service.addUmkm({
      image,
      logo,
      name,
      description,
      location,
      history,
      impact,
      contact,
      employe,
      owner,
    });

    const response = h.response({
      error: false,
      status: 'success',
      message: 'UMKM berhasil didaftarkan',
      data: {
        umkmId,
      },
    });
    response.code(201);
    return response;
  }

  async putUMKMHandler(request, h) {
    this._validator.validateUmkmPayload(request.payload);
    const { id } = request.params;

    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyUmkmOwner(id, credentialId);

    await this._service.editUmkmById(id, request.payload);

    return {
      error: false,
      status: 'success',
      message: 'Profil UMKM berhasil diupdate',
    };
  }

  async deleteUmkmByIdHandler(request, h) {
    const { id } = request.params;

    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyUmkmOwner(id, credentialId);

    await this._service.deleteUmkmById(id);

    return {
      error: false,
      status: 'success',
      message: 'Umkm berhasil dihapus',
    };
  }
}

module.exports = UMKMHandler;
