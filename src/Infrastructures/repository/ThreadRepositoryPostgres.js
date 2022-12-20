const CreatedThread = require('../../Domains/threads/entities/CreatedThread');
const RetrivedThread = require('../../Domains/threads/entities/RetrivedThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(threadCreate) {
    const { title, body, owner } = threadCreate;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO thread VALUES($1, $2, $3, $4) RETURNING id, title, owner',
      values: [id, owner, title, body],
    };

    const result = await this._pool.query(query);

    return new CreatedThread({ ...result.rows[0] });
  }

  async getThreadById(thread_id) {
    const query = {
      text: 'SELECT * FROM thread WHERE id = $1',
      values: [thread_id],
    };

    const result = await this._pool.query(query);

    return new RetrivedThread({ ...result.rows[0] });
  }
}

module.exports = ThreadRepositoryPostgres;
