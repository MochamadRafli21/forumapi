class DeleteComment {
    constructor({ thread, comment, owner }) {
      if (!thread || !comment || !owner ) {
        throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.thread = thread
      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = DeleteComment;