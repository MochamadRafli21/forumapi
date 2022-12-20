/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentTableTestHelper = {
  async addComment({
    id = 'conmment-123', owner = 'user-123', thread = 'thread-123', content = 'this is the content',
  }) {
    const query = {
      text: 'INSERT INTO comment VALUES($1, $2, $3, $4)',
      values: [id, owner, thread, content],
    };

    await pool.query(query);
  },

  async findCommentdById(id) {
    const query = {
      text: 'SELECT * FROM comment WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment WHERE 1=1');
  },
};

module.exports = CommentTableTestHelper;
