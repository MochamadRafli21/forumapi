class DeleteLike {
    constructor({thread, like, comment, owner }) {
      if (!thread || !like || !comment || !owner ) {
        throw new Error('DELETE_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.like = like
      this.thread = thread
      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = DeleteLike;