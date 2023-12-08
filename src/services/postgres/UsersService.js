const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({
    username, email, image, password, fullname,
  }, role) {
    await this.verifyNewUsername(username);
    await this.verifyNewEmail(email);

    const id = `TMA-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, username, email, image, role, hashedPassword, fullname, createAt, updateAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError(`${role} gagal ditambahkan`);
    }
    return result.rows[0].id;
  }

  async verifyNewUsername(username, message = 'Gagal menambahkan user') {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(`${message}. Username sudah digunakan.`);
    }
  }

  async verifyNewEmail(email, message = 'Gagal menambahkan user') {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(`${message}. Email sudah digunakan.`);
    }
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, username, email, image, fullname FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, role, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthenticationError('Username / Password Salah');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    const { role } = result.rows[0];
    if (role !== 'user') {
      throw new AuthenticationError('Username / Password Salah');
    }

    if (!match) {
      throw new AuthenticationError('Username / Password Salah');
    }
    return id;
  }

  async verifyUserCredentialAndRole(username, password) {
    const query = {
      text: 'SELECT id, role, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthenticationError('Username / Password Salah');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    const { role } = result.rows[0];
    if (role !== 'admin') {
      throw new AuthenticationError('Username / Password Salah');
    }

    if (!match) {
      throw new AuthenticationError('Username / Password Salah');
    }
    return id;
  }

  async editProfile(id, {
    username, image, email, fullname,
  }) {
    const query1 = {
      text: 'SELECT username, email FROM users WHERE id = $1',
      values: [id],
    };

    const result1 = await this._pool.query(query1);

    const preusername = result1.rows[0].username;
    const preemail = result1.rows[0].email;

    if (username !== preusername) {
      await this.verifyNewUsername(username, 'Gagal edit profil');
    }
    if (email !== preemail) {
      await this.verifyNewEmail(email, 'Gagal edit profil');
    }

    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE users SET username = $1, image = $2, email = $3, fullname = $4, updated_at = $5 WHERE id = $6 RETURNING id',
      values: [
        username, image, email, fullname,
        updatedAt, id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Profil. Id tidak ditemukan');
    }
  }

  async deleteUserById(id) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Akun gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = UsersService;
