class AddLike {
    constructor({thread, comment, owner }) {
      if (!thread || !owner || !comment ) {
        throw new Error('ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.thread = thread
      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = AddLike;