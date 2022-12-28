class DeletedReply {
    constructor(payload) {

      this._verifyPayload(payload);
  
      const { id, is_deleted } = payload;
  
      this.id = id;
      this.is_deleted = is_deleted;
    }
  
    _verifyPayload(payload) {
      const { id, is_deleted } = payload
      if (is_deleted === false) {
        throw new Error('DELETED_REPLY.FAILED_TO_REMOVE_REPLY');
      }

      if (!id || !is_deleted) {
        throw new Error('DELETED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof id !== 'string' || typeof is_deleted !== 'boolean') {
        throw new Error('DELETED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DeletedReply;
  