const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError.js');

class ProductsService {
  constructor() {
    this._products = [];
  }

  addProduct({
    image, name, price, description, resources, production, impact, contribution, umkm, category,
  }) {
    const id = nanoid(8);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newProducts = {
      id,
      name,
      image,
      price,
      description,
      resources,
      production,
      impact,
      contribution,
      createdAt,
      updatedAt,
      umkm,
      category,
    };

    this._products.push(newProducts);

    const isSuccess = this._products.filter((product) => product.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Produk gagal ditambahkan');
    }

    return id;
  }

  getProducts() {
    return this._products;
  }

  getProductById(id) {
    const product = this._products.filter((n) => n.id === id)[0];
    if (!product) {
      throw new Error('Produk tidak ditemukan');
    }
    return product;
  }

  editProductById(id, {
    image, name, price, description, resources, production, impact, contribution, umkm, category,
  }) {
    const index = this._products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui Produk. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._products[index] = {
      ...this._products[index],
      name,
      image,
      price,
      description,
      resources,
      production,
      impact,
      contribution,
      umkm,
      category,
      updatedAt,
    };
  }

  deleteProductById(id) {
    const index = this._products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('Produk gagal dihapus. Id tidak ditemukan');
    }

    this._products.splice(index, 1);
  }
}

module.exports = ProductsService;
