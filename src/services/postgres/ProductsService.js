const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapDBToModel } = require('../../utils');

class ProductService {
  constructor() {
    this._pool = new Pool();
  }

  async addProduct({
    image, name, price, description, resources,
    production, impact, contribution, category, owner,
  }) {
    const id = `TMP-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const queryGetUmkmId = {
      text: 'SELECT id FROM umkm WHERE owner = $1',
      values: [owner],
    };

    const getUmkm = await this._pool.query(queryGetUmkmId);

    const umkm = getUmkm.rows[0].id;
    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id',
      values: [
        id,
        image,
        name,
        price,
        umkm,
        description,
        resources,
        production,
        impact,
        contribution,
        category,
        owner,
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
    const result = await this._pool.query('SELECT * FROM products');

    return result.rows.map(mapDBToModel);
  }

  async getProductsRecomendation() {
    const result = await this._pool.query('SELECT * FROM products ORDER BY RANDOM() LIMIT 4');

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

    const UmkmId = result.rows[0].umkm;
    // return mapDBToModel(result.rows[0]);

    const query2 = {
      text: 'SELECT id, logo, name, location, employe FROM umkm WHERE id = $1',
      values: [UmkmId],
    };

    const resultWithUmkm = await this._pool.query(query2);

    const resourceIds = result.rows[0].resources;

    const resources = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const resourceId of resourceIds) {
      // eslint-disable-next-line no-await-in-loop
      const resourceDetail = await this.getResourceById(resourceId);
      resources.push(resourceDetail);
    }

    const impactIds = result.rows[0].impact;

    const impacts = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const impactId of impactIds) {
      // eslint-disable-next-line no-await-in-loop
      const impactDetail = await this.getImpactById(impactId);
      impacts.push(impactDetail);
    }

    return mapDBToModel(result.rows[0], resultWithUmkm.rows[0], resources, impacts);
  }

  async getProductByCategory(id) {
    const query = {
      text: 'SELECT * FROM products WHERE category = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModel);
  }

  async getProductByKeyword(keyword) {
    const query = {
      text: 'SELECT * FROM products WHERE name ILIKE  $1',
      values: [`%${keyword}%`],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModel);
  }

  async getProductByIdUmkm(id) {
    const query = {
      text: 'SELECT * FROM products WHERE umkm = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModel);
  }

  async editProductById(id, {
    image, name, price, description, resources, production, impact, contribution, category,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE products SET name = $1, image = $2, price = $3, description = $4, resources= $5, production = $6, impact = $7, contribution = $8, category = $9, updated_at = $11 WHERE id = $10 RETURNING id',
      values: [
        name, image, price, description, resources,
        production, impact, contribution, category, id, updatedAt,
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

  async verifyProductOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Resource yang Anda minta tidak ditemukan');
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async getResourceById(resourceId) {
    const queryResource = {
      text: 'SELECT * FROM resources WHERE id = $1',
      values: [resourceId],
    };

    const resourceResult = await this._pool.query(queryResource);

    return resourceResult.rows[0];
  }

  async getImpactById(impactId) {
    const queryImpact = {
      text: 'SELECT * FROM impacts WHERE id = $1',
      values: [impactId],
    };

    const impactResult = await this._pool.query(queryImpact);

    return impactResult.rows[0];
  }
}

module.exports = ProductService;
