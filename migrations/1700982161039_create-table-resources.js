/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
    image: {
      type: 'text',
      notNull: true,
    },
    location: { type: 'jsonb', notNull: true },
    umkm: {
      type: 'varchar(50)',
      allowNull: true,
    },
    description: {
      type: 'text',
      allowNull: true,
    },
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
  pgm.dropTable('resources');
};
