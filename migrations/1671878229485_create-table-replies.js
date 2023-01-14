/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('likes', {
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
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    pgm.addConstraint('likes', 'fk_reply.owner_users.id','FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('likes', 'fk_reply.comment.id','FOREIGN KEY (comment) REFERENCES comment(id) ON DELETE CASCADE');

};

exports.down = pgm => {
    pgm.dropConstraint('likes','fk_likes.owner_users.id');
    pgm.dropConstraint('likes','fk_likes.comment.id');

    pgm.dropTable('likes');
};
