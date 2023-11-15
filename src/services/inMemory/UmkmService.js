// const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError.js');
// const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToModel } = require('../../utils');

class UmkmService {
  constructor() {
    this._umkm = [];
  }

  addUmkm({
    image, name, description, location,
    history, impact, contact,
  }) {
    console.log('aku disini');
    const id = `Umkm-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newUmkm = {
      id,
      image,
      name,
      description,
      location,
      history,
      impact,
      contact,
      createAt,
      updateAt,
    };
    console.log(newUmkm);

    this._umkm.push(newUmkm);

    const isSuccess = this._umkm.filter((umkm) => umkm.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Produk gagal ditambahkan');
    }
    console.log(id);
    return id;
  }

  // async getUmkms({ id, image, name, description, location, text, email, phone, }) {
  //   if (id === undefined) {
  //     id = '';
  //   }

  //   if (name === undefined) {
  //     name = '';
  //   }

  //   if (image === undefined) {
  //     image = '';
  //   }

  //   if (description === undefined) {
  //     description = '';
  //   }

  //   if (location === undefined) {
  //     location = '';
  //   }

  //   if (text === undefined) {
  //     text = '';
  //   }

  //   if (email === undefined) {
  //     email = '';
  //   }

  //   if (phone === undefined) {
  //     phone = '';
  //   }

  //   const query = {
  // text: 'SELECT id, name, image, price FROM
  // Umkms WHERE lower(name) LIKE $1 AND lower(category) LIKE $2',
  //     values: [`%${name.toLowerCase()}%`, `%${category.toLowerCase()}%`],
  //   };

  //   const result = await this._pool.query(query);

  //   return result.rows;
  // }

  getUmkmById(id) {
    const umkm = this._umkm.filter((n) => n.id === id)[0];

    if (!umkm) {
      throw new Error('Umkm tidak ditemukan');
    }
    return umkm;
  }

  async editUmkmById(id, {
    image, name, description, location, text, email, phone,
  }) {
    const index = this._umkm.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui UMKM. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._umkm[index] = {
      ...this._umkm[index],
      image,
      name,
      description,
      location,
      text,
      email,
      phone,
      updatedAt,
    };
  }

  // async deleteUmkmById(id) {
  //   const query = {
  //     text: 'DELETE FROM Umkms WHERE id = $1 RETURNING id',
  //     values: [id],
  //   };

  //   const result = await this._pool.query(query);

  //   if (!result.rowCount) {
  //     throw new NotFoundError('Umkm gagal dihapus. Id tidak ditemukan');
  //   }
  // }
}

module.exports = UmkmService;
