const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapUmkmToModel } = require('../../utils');

class UmkmService {
  constructor() {
    this._pool = new Pool();
  }

  async addUmkm({
    name, owner,
  }) {
    const umkmcheck = {
      text: 'SELECT * FROM umkm WHERE owner = $1',
      values: [owner],
    };

    const umkm = await this._pool.query(umkmcheck);
    if (umkm.rows.length > 0) {
      throw new InvariantError('UMKM sudah ada');
    }
    const id = `Umkm-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const image = 'https://i.ibb.co/0fr1VCg/image.jpg';
    const logo = 'https://i.ibb.co/0fr1VCg/image.jpg';
    const description = null;
    const location = null;
    const history = null;
    const impact = null;
    const contact = null;
    const employe = null;
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

  async getUmkmById(id) {
    const query = {
      text: 'SELECT * FROM umkm WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm tidak ditemukan');
    }

    return mapUmkmToModel(result.rows[0]);
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

    return mapUmkmToModel(result.rows[0]);
  }

  async editUmkmById(id, {
    image, logo, name, description, location, history, impact, contact, employe,
  }) {
    const query = {
      text: 'UPDATE umkm SET name = $2, image = $1, logo = $9, description = $3, location = $4, history = $5, impact = $6, contact = $7, employe = $10 WHERE owner = $8 RETURNING id',
      values: [image, name, description, location, history, impact, contact, id, logo, employe],
    };

    const result = await this._pool.query(query);

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
}

module.exports = UmkmService;
