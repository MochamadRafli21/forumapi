exports.up = pgm => {
    pgm.addColumns('thread', {date: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    }});

    pgm.addColumns('comment', {date: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    }});
    
};

exports.down = pgm => {
    pgm.dropColumns('thread',["date"], {cascade:true});
    pgm.dropColumns('comment',["date"], {cascade:true});
};
