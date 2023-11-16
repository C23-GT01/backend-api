/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('umkm', {
    id: { type: 'varchar(50)', primaryKey: true },
    image: { type: 'text', notNull: true },
    name: { type: 'text', notNull: true },
    description: { type: 'text', allowNull: true },
    location: { type: 'string', notNull: true },
    history: { type: 'string', allowNull: true },
    impact: { type: 'text[]', allowNull: true },
    contact: { type: 'text[]', allowNull: true },
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
