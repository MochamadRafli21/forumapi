class AddLike {
    constructor({ comment, owner }) {
      if (!owner || !comment ) {
        throw new Error('ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = AddLike;