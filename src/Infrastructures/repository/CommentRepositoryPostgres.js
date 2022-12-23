const CreatedComment = require('../../Domains/comments/entities/CreatedComment');
const VerifiedComment = require('../../Domains/comments/entities/VerifiedComment')
const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(createComment) {
    const { thread, content, owner } = createComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comment VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [id, owner, thread, content],
    };

    const result = await this._pool.query(query);

    return new CreatedComment({ ...result.rows[0] });
  }

  async deleteComment(deleteComment) {
    const { thread, comment, owner } = deleteComment;

    const query = {
      text: 'UPDATE comment SET is_deleted = true WHERE id = $1 AND thread = $2 AND owner = $3',
      values: [comment, thread, owner],
    };
    await this._pool.query(query);
  }

  async verifyCommentOwner(verifyComment) {
    const { comment, owner } = verifyComment;

    const query = {
      text: 'SELECT id, owner FROM comment WHERE id = $1',
      values: [comment],
    };
    const result =await this._pool.query(query);
    let data = { ...result.rows[0] }
    data.payload_owner = owner
    return new VerifiedComment(data);
  }
}

module.exports = CommentRepositoryPostgres;
