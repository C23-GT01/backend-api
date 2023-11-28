const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapResourceToModel } = require('../../utils');

class ResourceService {
  constructor() {
    this._pool = new Pool();
  }

  async addResource({
    name, image, location, umkm, description, owner,
  }) {
    const id = `rsc-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO resources VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        name,
        image,
        location,
        umkm,
        description,
        owner,
        createAt,
        updateAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Resources gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getResources(owner) {
    const query = {
      text: 'SELECT * FROM resources WHERE owner = $1',
      values: [owner],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapResourceToModel);
  }

  async getResourceById(id) {
    const query = {
      text: 'SELECT * FROM resources WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Resource tidak ditemukan');
    }

    return mapResourceToModel(result.rows[0]);
  }

  async editResourceById(id, {
    name, image, location, umkm, description,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE resources SET name = $1, image = $2, location = $3, umkm = $4, description= $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [
        name, image, location, umkm, description,
        updatedAt, id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Resource. Id tidak ditemukan');
    }
  }

  async deleteResourceById(id) {
    const query = {
      text: 'DELETE FROM resources WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Resource gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyResourceOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM resources WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Resource yang Anda minta tidak ditemukan');
    }

    const resource = result.rows[0];

    if (resource.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengelola resource ini');
    }
  }
}

module.exports = ResourceService;
