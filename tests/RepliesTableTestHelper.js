/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ReplyTableTestHelper = {
  async addReply({
    id = 'reply-123', owner = 'user-123', comment = 'comment-123', content = 'this is the content',
  }) {
    const query = {
      text: 'INSERT INTO reply VALUES($1, $2, $3, $4) RETURNING id, content, owner, date',
      values: [id, owner, comment, content],
    };

    const result = await pool.query(query);
    return result.rows[0]

  },

  async findReplydById(id) {
    const query = {
      text: 'SELECT * FROM reply WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM reply WHERE 1=1');
  },
};

module.exports = ReplyTableTestHelper;
