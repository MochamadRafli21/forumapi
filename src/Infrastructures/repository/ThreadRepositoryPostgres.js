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

  async getThread(thread_id) {
    const query = {
      text: 'SELECT thread.id as thread_id, thread.title as thread_title , thread.body as thread_body, i.username as owner, thread.date as thread_date, comment.id as comment_id, comment.content, s.username as thread_username, comment.date, comment.is_deleted , reply.id as reply_id, reply.content as reply_content, reply.date as reply_date , x.username as reply_username, reply.is_deleted as reply_is_deleted FROM thread LEFT JOIN comment ON thread.id = comment.thread LEFT JOIN reply ON comment.id = reply.comment LEFT JOIN users as s ON thread.owner = s.id LEFT JOIN users as i ON comment.owner = i.id LEFT JOIN users as x ON x.id = reply.owner WHERE thread.id = $1 ORDER BY reply.date',
      values: [thread_id],
    };

    const result = await this._pool.query(query);
    return new RetrivedThread(result.rows);
  }
}

module.exports = ThreadRepositoryPostgres;
