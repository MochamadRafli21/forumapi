class VerifyLike {
    constructor({ like, owner }) {
      if (!like, !owner ) {
        throw new Error('VERIFY_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof like !== 'string' || typeof owner !== 'string') {
        throw new Error('VERIFY_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.like = like
      this.owner = owner
    }
  }
  
  module.exports = VerifyLike;