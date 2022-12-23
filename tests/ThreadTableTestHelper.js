/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
  async addThread({
    id = 'thread-123', title = 'dicoding', body = 'secret', owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO thread VALUES($1, $2, $3, $4) RETURNING id, title, owner,date',
      values: [id, owner, title, body],
    };

    const result = await pool.query(query);
    return result.rows[0]
  },

  async findThreadById(id) {
    const query = {
      text: 'SELECT * FROM thread WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM thread WHERE 1=1');
  },
};

module.exports = ThreadTableTestHelper;
