/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('thread', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        owner: {
          type: 'VARCHAR(50)',
          foreign_key:true,
          notNull: true,
        },
        title: {
          type: 'TEXT',
          notNull: true,
        },
        body: {
          type: 'TEXT',
          notNull: true,
        },
    });

    pgm.addConstraint('thread', 'fk_thread.owner_users.id','FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('thread','fk_thread.owner_users.id');

    pgm.dropTable('thread');
};
