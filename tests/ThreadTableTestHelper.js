/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
  async addThread({
    id = 'user-123', title = 'dicoding', body = 'secret', owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO thread VALUES($1, $2, $3, $4)',
      values: [id, owner, title, body],
    };

    await pool.query(query);
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