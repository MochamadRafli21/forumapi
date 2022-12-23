exports.up = pgm => {
    pgm.addColumns('comment', {is_deleted: {
        type: 'boolean',
        notNull: true,
        default: false,
    }});
};

exports.down = pgm => {
    pgm.dropColumns('comment',["is_deleted"], {cascade:true});
};
