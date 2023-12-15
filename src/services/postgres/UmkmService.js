const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const { mapUmkmToModel } = require('../../utils');

class UmkmService {
  constructor() {
    this._pool = new Pool();
  }

  async addUmkm({
    logo,
    name, owner, location, description, employe,
  }) {
    const umkmcheck = {
      text: 'SELECT * FROM umkm WHERE owner = $1',
      values: [owner],
    };

    const umkm = await this._pool.query(umkmcheck);
    if (umkm.rows.length > 0) {
      throw new InvariantError('UMKM sudah ada');
    }
    const id = `TMU-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const image = 'https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg';
    const history = null;
    const impact = [];
    const contact = null;
    const updateAt = createAt;
    const isApprove = true;
    const query = {
      text: 'INSERT INTO umkm VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id',
      values: [
        id,
        image,
        logo,
        name,
        description,
        location,
        history,
        impact,
        contact,
        employe,
        isApprove,
        owner,
        createAt,
        updateAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Umkm gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUmkm() {
    const result = await this._pool.query('SELECT * FROM umkm WHERE is_approve = true');

    return result.rows.map(mapUmkmToModel);
  }

  async getUmkmApprove(bool) {
    if (typeof bool !== 'boolean') {
      throw new InvariantError('Invalid parameter');
    }
    const query = {
      text: 'SELECT * FROM umkm WHERE is_approve = $1',
      values: [bool],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapUmkmToModel);
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
  }

  async getUmkmById(id) {
    const query = {
      text: 'SELECT * FROM umkm WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm tidak ditemukan');
    }

    const query2 = {
      text: 'SELECT * FROM impacts WHERE owner = $1',
      values: [result.rows[0].owner],
    };

    const impacts = await this._pool.query(query2);

    return mapUmkmToModel(result.rows[0], impacts.rows);
  }

  async getUmkmByOwner(id) {
    const query = {
      text: 'SELECT * FROM umkm WHERE owner = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm tidak ditemukan');
    }

    const query2 = {
      text: 'SELECT * FROM impacts WHERE owner = $1',
      values: [id],
    };

    const impacts = await this._pool.query(query2);
    return mapUmkmToModel(result.rows[0], impacts.rows);
  }

  async editUmkmById(id, {
    image, logo, name, description, location, history, impact, contact, employe,
  }) {
    const query = {
      text: 'UPDATE umkm SET name = $2, image = $1, logo = $9, description = $3, location = $4, history = $5, impact = $6, contact = $7, employe = $10 WHERE owner = $8 RETURNING id',
      values: [image, name, description, location, history, impact, contact, id, logo, employe],
    };

    const result = await this._pool.query(query);
    console.log('aku');

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui Umkm. Id tidak ditemukan');
    }
  }

  async deleteUmkmById(id) {
    const query = {
      text: 'DELETE FROM umkm WHERE owner = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm gagal dihapus. Id tidak ditemukan');
    }
  }

  async editUmkmAprroveById(id) {
    const query1 = {
      text: 'SELECT is_approve FROM umkm WHERE id = $1',
      values: [id],
    };

    const result1 = await this._pool.query(query1);
    const isApprove = !result1.rows[0].is_approve;
    const query = {
      text: 'UPDATE umkm SET is_approve = $1 WHERE id = $2 RETURNING id',
      values: [isApprove, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal. Id tidak ditemukan');
    }
  }

  async verifyUmkmOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM umkm WHERE id = $1',
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

  async getImpactById(impactId) {
    const queryImpact = {
      text: 'SELECT * FROM impacts WHERE id = $1',
      values: [impactId],
    };

    const impactResult = await this._pool.query(queryImpact);

    return impactResult.rows[0];
  }
}

module.exports = UmkmService;
