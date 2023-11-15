class UMKMHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getDetailUMKMHandler = this.getDetailUMKMHandler.bind(this);
    this.postUMKMHandler = this.postUMKMHandler.bind(this);
    this.putUMKMHandler = this.putUMKMHandler.bind(this);
  }

  getDetailUMKMHandler(request, h) {
    try {
      const { id } = request.params;

      const umkm = this._service.getUmkmById(id);

      return {
        status: 'success',
        data: {
          umkm,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  postUMKMHandler(request, h) {
    try {
      const {
        image, name, description, location,
        history, impact, contact,
      } = request.payload;
      const umkmId = this._service.addUmkm({
        image,
        name,
        description,
        location,
        history,
        impact,
        contact,
      });
      console.log(umkmId);

      const response = h.response({
        status: 'success',
        message: 'UMKM berhasil didaftarkan',
        data: {
          umkmId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  putUMKMHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.editUmkmById(id, request.payload);

      return {
        status: 'success',
        message: 'Profil UMKM berhasil diupdate',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = UMKMHandler;
