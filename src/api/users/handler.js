class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const {
      username, email, image, password, fullname,
    } = request.payload;

    const userId = await this._service.addUser({
      username,
      email,
      image,
      password,
      fullname,
    }, 'user');

    const response = h.response({
      error: false,
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async postAdminHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const {
      username, email, image, password, fullname,
    } = request.payload;

    const userId = await this._service.addUser({
      username,
      email,
      image,
      password,
      fullname,
    }, 'admin');

    const response = h.response({
      error: false,
      status: 'success',
      message: 'Admin berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;

    const user = await this._service.getUserById(id);

    return {
      error: false,
      status: 'success',
      data: {
        user,
      },
    };
  }

  async getUserProfileHandler(request, h) {
    const { id } = request.auth.credentials;

    const user = await this._service.getUserById(id);

    return {
      error: false,
      status: 'success',
      data: {
        user,
      },
    };
  }

  async putUserHandler(request, h) {
    const { id } = request.auth.credentials;

    await this._service.editProfile(id, request.payload);

    return {
      error: false,
      status: 'success',
      message: 'Profil berhasil diperbarui',
    };
  }

  async deleteUserHandler(request, h) {
    const { id } = request.auth.credentials;

    await this._service.deleteUserById(id);

    return {
      error: false,
      status: 'success',
      message: 'Akun berhasil dihapus',
    };
  }
}

module.exports = UsersHandler;
