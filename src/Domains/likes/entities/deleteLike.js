class DeleteLike {
    constructor({ comment, owner }) {
      if ( !comment || !owner ) {
        throw new Error('DELETE_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = DeleteLike;