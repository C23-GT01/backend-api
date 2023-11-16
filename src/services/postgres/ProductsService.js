const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class ProductService {
  constructor() {
    this._pool = new Pool();
  }

  async addProduct({
    image, name, price, description, resources, production, impact, contribution, umkm, category,
  }) {
    const id = `product-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id',
      values: [id,
        name,
        image,
        price,
        description,
        umkm,
        resources,
        production,
        impact,
        contribution,
        category,
        createAt,
        updateAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Product gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getProducts() {
    // if (id === undefined) {
    //   id = '';
    // }

    // if (name === undefined) {
    //   name = '';
    // }

    // if (image === undefined) {
    //   image = '';
    // }

    // if (price === undefined) {
    //   price = '';
    // }

    // const query = {
    //   text: 'SELECT id, name, image, price FROM products WHERE lower
    // (name) LIKE $1 AND lower(category) LIKE $2',
    //   values: [`%${name.toLowerCase()}%`, `%${category.toLowerCase()}%`],
    // };

    const result = await this._pool.query('SELECT * FROM notes');

    return result.rows.map(mapDBToModel);
  }

  async getProductById(id) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Product tidak ditemukan');
    }

    return mapDBToModel(result.rows[0]);
  }

  async editProductById(id, {
    image, name, price, description, resources, production, impact, contribution, umkm, category,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE products SET name = $1, image = $2, price = $3, description = $4, umkm = $5, resources= $6, production = $7, impact = $8, contribution = $9, category = $10, WHERE id = $11 RETURNING id',
      values: [
        name, image, price, description, umkm, resources,
        production, impact, contribution, category, id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Product. Id tidak ditemukan');
    }
  }

  async deleteProductById(id) {
    const query = {
      text: 'DELETE FROM products WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Product gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ProductService;
