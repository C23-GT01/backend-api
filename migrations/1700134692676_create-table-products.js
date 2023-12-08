/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    image: {
      type: 'TEXT[]',
      notNull: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
    price: {
      type: 'integer',
      notNull: true,
    },
    umkm: {
      type: 'varchar(50)',
      notNull: true,
    },
    description: {
      type: 'text',
      allowNull: true,
    },
    resources: {
      type: 'TEXT[]',
      allowNull: true,
    },
    production: {
      type: 'jsonb[]',
      allowNull: true,
    },
    impact: {
      type: 'TEXT[]',
      allowNull: true,
    },
    contribution: {
      type: 'integer[]',
      allowNull: true,
    },
    category: {
      type: 'integer',
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
  pgm.dropTable('products');
};
