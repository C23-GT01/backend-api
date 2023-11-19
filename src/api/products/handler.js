const ClientError = require('../../exceptions/ClientError');

class ProductsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  async postProductHandler(request, h) {
    try {
      this._validator.validateProductPayload(request.payload);
      const {
        image, name, price, description, resources,
        production, impact, contribution, category,
      } = request.payload;

      const { id: owner } = request.auth.credentials;

      const productId = await this._service.addProduct({
        image,
        name,
        price,
        description,
        resources,
        production,
        impact,
        contribution,
        category,
        owner,
      });

      const response = h.response({
        status: 'success',
        message: 'Produk berhasil ditambahkan',
        data: {
          productId,
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

  async getAllProductsHandler() {
    const products = await this._service.getProducts();
    return {
      status: 'success',
      data: {
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          category: product.category,
        })),
      },
    };
  }

  async getProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const product = await this._service.getProductById(id);

      return {
        status: 'success',
        data: {
          product,
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

  async putProductByIdHandler(request, h) {
    this._validator.validateProductPayload(request.payload);
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyProductOwner(id, credentialId);

      await this._service.editProductById(id, request.payload);

      return {
        status: 'success',
        message: 'Produk berhasil diperbarui',
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

  async deleteProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyProductOwner(id, credentialId);

      await this._service.deleteProductById(id);

      return {
        status: 'success',
        message: 'Produk berhasil dihapus',
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

module.exports = ProductsHandler;
