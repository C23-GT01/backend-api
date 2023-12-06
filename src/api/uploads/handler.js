class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    try {
      const filename = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        error: false,
        status: 'success',
        data: {
          fileLocation: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${filename}`,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        error: true,
        status: 'failed',
        message: `Failed to upload file to Google Cloud Storage: ${error.message}`,
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = UploadsHandler;
