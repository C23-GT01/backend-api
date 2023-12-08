const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const { mapImpactToModel, mapImpactToModelWithOwner } = require('../../utils');

class ImpactsService {
  constructor() {
    this._pool = new Pool();
  }

  async addImpact({
    name, image, description, owner,
  }) {
    const id = `TMI-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const isApprove = true;

    const query = {
      text: 'INSERT INTO impacts VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        name,
        image,
        description,
        isApprove,
        owner,
        createAt,
        updateAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Impacts gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getImpacts(owner) {
    const query = {
      text: 'SELECT * FROM impacts WHERE owner = $1',
      values: [owner],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapImpactToModel);
  }

  async getImpactsApprove(bool) {
    if (typeof bool !== 'boolean') {
      throw new InvariantError('Invalid parameter');
    }

    const query = {
      text: 'SELECT * FROM impacts WHERE is_approve = $1',
      values: [bool],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapImpactToModelWithOwner);
  }

  async verifyIsAdmin(id) {
    const query = {
      text: 'SELECT role FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    const { role } = result.rows[0];
    if (role !== 'admin') {
      throw new AuthenticationError('Acces denied');
    }

    return id;
  }

  async getImpactById(id) {
    const query = {
      text: 'SELECT * FROM impacts WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Impact tidak ditemukan');
    }

    return mapImpactToModel(result.rows[0]);
  }

  async editImpactById(id, {
    name, image, description,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE impacts SET name = $1, image = $2, description= $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [
        name, image, description,
        updatedAt, id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Impact. Id tidak ditemukan');
    }
  }

  async editImpactAprroveById(id) {
    const query1 = {
      text: 'SELECT is_approve FROM impacts WHERE id = $1',
      values: [id],
    };

    const result1 = await this._pool.query(query1);
    const isApprove = !result1.rows[0].is_approve;
    const query = {
      text: 'UPDATE impacts SET is_approve = $1 WHERE id = $2 RETURNING id',
      values: [isApprove, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal. Id tidak ditemukan');
    }
  }

  async deleteImpactById(id) {
    const query = {
      text: 'DELETE FROM impacts WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Impact gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyImpactOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM impacts WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Impact yang Anda minta tidak ditemukan');
    }

    const impact = result.rows[0];

    if (impact.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengelola impact ini');
    }
  }
}

module.exports = ImpactsService;
