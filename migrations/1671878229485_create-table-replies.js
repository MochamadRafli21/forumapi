/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('reply', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        owner: {
          type: 'VARCHAR(50)',
          foreign_key:true,
          notNull: true,
        },
        comment: {
            type: 'VARCHAR(50)',
            foreign_key:true,
            notNull: true,
        },
        content: {
          type: 'TEXT',
          notNull: true,
        },
        is_deleted: {
            type: 'boolean',
            notNull: true,
            default: false,
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    pgm.addConstraint('reply', 'fk_reply.owner_users.id','FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('reply', 'fk_reply.comment.id','FOREIGN KEY (comment) REFERENCES comment(id) ON DELETE CASCADE');

};

exports.down = pgm => {
    pgm.dropConstraint('reply','fk_reply.owner_users.id');
    pgm.dropConstraint('reply','fk_reply.comment.id');

    pgm.dropTable('reply');
};
