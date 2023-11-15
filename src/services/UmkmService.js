const { Pool } = require('pg');
const { nanoid } = require('nanoid');
// const InvariantError = require('../../exceptions/InvariantError');
// const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToModel } = require('../../utils');

class UmkmService {
  constructor() {
    this._pool = new Pool();
  }

  async addUmkm({
    id, image, name, description, location, text, email, phone,
  }) {
    const id = `Umkm-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO Umkms VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [id,
        image,
        name,
        description,
        location,
        text,
        email,
        phone,
        createAt,
        updateAt,],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Umkm gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUmkms({ id, image, name, description, location, text, email, phone, }) 
  {
    if (id === undefined) {
      id = '';
    }
    
    if (name === undefined) {
      name = '';
    }

    if (image === undefined) {
      image = '';
    }

    if (description === undefined) {
      description = '';
    }

    if (location === undefined) {
        location = '';
    }

    if (text === undefined) {
      text = '';
    }

    if (email === undefined) {
        email = '';
    }

    if (phone === undefined) {
        phone = '';
    }


    const query = {
      text: 'SELECT id, name, image, price FROM Umkms WHERE lower(name) LIKE $1 AND lower(category) LIKE $2',
      values: [`%${name.toLowerCase()}%`, `%${category.toLowerCase()}%`],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getUmkmById(id) {
    const query = {
      text: 'SELECT * FROM Umkms WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm tidak ditemukan');
    }

    return mapDBToModel(result.rows[0]);
  }

  async editUmkmById(id, {
    id, image, name, description, location, text, email, phone,
  }) {
    const query = {
      text: 'UPDATE Umkms SET name = $1, image = $2, description = $3, location = $4, text = $5, text = $6, email = $7, phone = $8 WHERE id = $9 RETURNING id',
      values: [name, image, description, location, text, email, phone,],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui Umkm. Id tidak ditemukan');
    }
  }

  async deleteUmkmById(id) {
    const query = {
      text: 'DELETE FROM Umkms WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Umkm gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = UmkmService;
