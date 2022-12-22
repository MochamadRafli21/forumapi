class VerifyComment {
    constructor({ comment, owner }) {
      if (!comment, !owner ) {
        throw new Error('VERIFY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof comment !== 'string' || typeof owner !== 'string') {
        throw new Error('VERIFY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = VerifyComment;