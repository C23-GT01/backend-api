/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('umkm', {
    id: { type: 'varchar(50)', primaryKey: true },
    image: { type: 'text', notNull: true },
    logo: { type: 'text', notNull: true },
    name: { type: 'text', allowNull: true },
    description: { type: 'text', allowNull: true },
    location: { type: 'jsonb', allowNull: true },
    history: { type: 'jsonb', allowNull: true },
    impact: { type: 'text[]', allowNull: true },
    contact: { type: 'jsonb[]', allowNull: true },
    employe: { type: 'text', allowNull: true },
    is_approve: { type: 'bool', notNull: true },
    owner: {
      type: 'varchar(50)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('umkm');
};
