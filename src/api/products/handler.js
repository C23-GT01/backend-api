class ProductsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postProductHandler(request, h) {
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
      error: false,
      status: 'success',
      message: 'Produk berhasil ditambahkan',
      data: {
        productId,
      },
    });
    response.code(201);
    return response;
  }

  async getAllProductsHandler() {
    const products = await this._service.getProducts();
    return {
      error: false,
      status: 'success',
      message: 'Menampilkan semua produk',
      count: products.length,
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

  async getAllProductsbyCategoryHandler(request, h) {
    const { id } = request.params;

    const products = await this._service.getProductByCategory(id);
    return {
      error: false,
      status: 'success',
      message: 'Menampilkan Product berdasakan Kategori',
      count: products.length,
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

  async getAllProductsbyKeywordHandler(request, h) {
    const { keyword } = request.params;

    const products = await this._service.getProductByKeyword(keyword);
    return {
      error: false,
      status: 'success',
      message: `Menampilkan hasil pencarian untuk '${keyword}'`,
      count: products.length,
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
    const { id } = request.params;

    const product = await this._service.getProductById(id);

    return {
      error: false,
      status: 'success',
      data: {
        product,
      },
    };
  }

  async getProductByIdUmkmHandler(request, h) {
    const { id } = request.params;

    const products = await this._service.getProductByIdUmkm(id);

    return {
      error: false,
      status: 'success',
      message: 'Menampilkan semua produk dari sebuah umkm',
      count: products.length,
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

  async putProductByIdHandler(request, h) {
    this._validator.validateProductPayload(request.payload);

    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyProductOwner(id, credentialId);

    await this._service.editProductById(id, request.payload);

    return {
      error: false,
      status: 'success',
      message: 'Produk berhasil diperbarui',
    };
  }

  async deleteProductByIdHandler(request, h) {
    const { id } = request.params;

    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyProductOwner(id, credentialId);

    await this._service.deleteProductById(id);

    return {
      error: false,
      status: 'success',
      message: 'Produk berhasil dihapus',
    };
  }
}

module.exports = ProductsHandler;
