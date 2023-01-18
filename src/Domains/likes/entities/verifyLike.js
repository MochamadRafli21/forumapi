class VerifyLike {
    constructor({ comment, owner }) {
      if (!comment, !owner ) {
        throw new Error('VERIFY_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof comment !== 'string' || typeof owner !== 'string') {
        throw new Error('VERIFY_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = VerifyLike;