class RetrivedComment {
    constructor(payload) {
      this._verifyPayload(payload);
      const { id, is_deleted } = payload[0];

      this.id = id
      this.is_deleted = is_deleted
    }  
    _verifyPayload(payload) {
      if (payload.length === 0) {
        throw new Error('RETRIEVED_COMMENT.NOT_FOUND');
      }

      if (payload[0].is_deleted) {
        throw new Error('RETRIEVED_COMMENT.IS_DELETED');
      }
    }
  }
  
  module.exports = RetrivedComment;
  