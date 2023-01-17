const AddedLike = require('../../Domains/likes/entities/addedLike');
const VerifiedLike = require('../../Domains/likes/entities/verifiedLike');
const DeletedLike = require('../../Domains/likes/entities/deletedLikes');
const LikeRepository = require('../../Domains/likes/LikesRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addLike(addLikes) {
    const { comment, owner } = addLikes;
    const id = `like-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3) RETURNING id, comment, owner',
      values: [id, owner, comment],
    };

    const result = await this._pool.query(query);

    return new AddedLike({ ...result.rows[0] });
  }

  async deleteLike(deleteLike) {
    const { comment, like, owner } = deleteLike;

    const query = {
      text: 'UPDATE likes SET is_deleted = true WHERE id = $1 AND comment = $2 AND owner = $3 RETURNING id, is_deleted',
      values: [like, comment, owner],
    };
    const result = await this._pool.query(query);

    return new DeletedLike({ ...result.rows[0] });  }

  async retriveLikesByOwnerAndComment(verifyLike) {
    const { comment, owner } = verifyLike;

    const query = {
      text: 'SELECT comment, owner FROM likes WHERE owner = $1 AND comment = $2 AND is_deleted = FALSE ',
      values: [owner, comment],
    };
    const result = await this._pool.query(query);
    let data = { ...result.rows[0] }
    return new VerifiedLike(data);
  }
}

module.exports = LikeRepositoryPostgres;
