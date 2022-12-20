/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comment', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        owner: {
          type: 'VARCHAR(50)',
          foreign_key:true,
          notNull: true,
        },
        thread: {
            type: 'VARCHAR(50)',
            foreign_key:true,
            notNull: true,
        },
        content: {
          type: 'TEXT',
          notNull: true,
        },
    });

    pgm.addConstraint('comment', 'fk_comment.owner_users.id','FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('comment', 'fk_comment.thread.id','FOREIGN KEY (thread) REFERENCES thread(id) ON DELETE CASCADE');

};

exports.down = pgm => {
    pgm.dropConstraint('comment','fk_comment.owner_users.id');
    pgm.dropConstraint('comment','fk_comment.thread.id');

    pgm.dropTable('comment');
};
