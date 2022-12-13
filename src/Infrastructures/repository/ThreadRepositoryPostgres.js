const CreatedThread = require('../../Domains/threads/entities/CreatedThread');
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
}

module.exports = ThreadRepositoryPostgres;
