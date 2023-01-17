/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
  async addLike({
    id = 'like-123', owner = 'user-123', comment = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3) RETURNING id, owner, comment',
      values: [id, owner, comment],
    };

    const result = await pool.query(query);
    return result.rows[0]

  },

  async findLikedByOwnerAndComments(owner, comment) {
    const query = {
      text: 'SELECT * FROM likes WHERE owner = $1 AND comment = $2 AND is_deleted = FALSE',
      values: [owner, comment],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM likes WHERE 1=1');
  },
};

module.exports = LikesTableTestHelper;
