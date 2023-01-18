class AddedLike {
    constructor(payload) {

      this._verifyPayload(payload);
  
      const { id,comment, owner } = payload;
  
      this.id = id;
      this.comment = comment
      this.owner = owner;
    }
  
    _verifyPayload(payload) {
      const { id, owner } = payload
      if (!id || !owner) {
        throw new Error('ADDED_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof id !== 'string' || typeof owner !== 'string') {
        throw new Error('ADDED_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = AddedLike;
  