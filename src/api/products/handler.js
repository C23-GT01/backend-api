class ProductsHandler {
  constructor(service) {
    this._service = service;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  postProductHandler(request, h) {
    try {
      const {
        image, name, price, description, resources,
        production, impact, contribution, umkm, category,
      } = request.payload;

      const productId = this._service.addProduct({
        image,
        name,
        price,
        description,
        resources,
        production,
        impact,
        contribution,
        umkm,
        category,
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
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getAllProductsHandler() {
    const products = this._service.getProducts();
    console.log(products);
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

  getProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const product = this._service.getProductById(id);

      return {
        status: 'success',
        data: {
          product,
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

  putProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.editProductById(id, request.payload);

      return {
        status: 'success',
        message: 'Produk berhasil diperbarui',
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

  deleteProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.deleteProductById(id);

      return {
        status: 'success',
        message: 'Produk berhasil dihapus',
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

module.exports = ProductsHandler;