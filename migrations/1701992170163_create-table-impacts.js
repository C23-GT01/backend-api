/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('impacts', {
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
    description: {
      type: 'text',
      allowNull: true,
    },
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
  pgm.dropTable('impacts');
};
