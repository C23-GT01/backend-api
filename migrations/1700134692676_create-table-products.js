/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: { type: 'serial', primaryKey: true },
    image: { type: 'text', notNull: true },
    name: { type: 'text', notNull: true },
    price: { type: 'numeric', notNull: true },
    umkm: { type: 'jsonb', notNull: true },
    description: { type: 'text', allowNull: true },
    resources: { type: 'text[]', allowNull: true },
    production: { type: 'text[]', allowNull: true },
    impact: { type: 'text[]', allowNull: true },
    contribution: { type: 'text[]', allowNull: true },
    category: { type: 'integer', allowNull: true },
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
