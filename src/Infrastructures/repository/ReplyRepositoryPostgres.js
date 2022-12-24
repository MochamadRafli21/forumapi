const CreatedReply = require('../../Domains/replies/entities/CreatedReply');
const VerifiedReply = require('../../Domains/replies/entities/VerifiedReply');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(createReply) {
    const { comment, content, owner } = createReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO reply VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [id, owner, comment, content],
    };

    const result = await this._pool.query(query);

    return new CreatedReply({ ...result.rows[0] });
  }

  async deleteReply(deleteReply) {
    const { comment, reply, owner } = deleteReply;

    const query = {
      text: 'UPDATE reply SET is_deleted = true WHERE id = $1 AND comment = $2 AND owner = $3',
      values: [reply, comment, owner],
    };
    await this._pool.query(query);
  }

  async verifyReplyOwner(verifyReply) {
    const { reply, owner } = verifyReply;

    const query = {
      text: 'SELECT id, owner FROM reply WHERE id = $1',
      values: [reply],
    };
    const result =await this._pool.query(query);
    let data = { ...result.rows[0] }
    data.payload_owner = owner
    return new VerifiedReply(data);
  }
}

module.exports = ReplyRepositoryPostgres;
