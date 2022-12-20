class RetrivedThread {
    constructor(payload) {

      this._verifyPayload(payload);
  
      const { id, title, owner } = payload;
  
      this.id = id;
      this.title = title;
      this.owner = owner;
    }
  
    _verifyPayload(payload) {
      const { id, title, owner } = payload
      if (!id || !title || !owner) {
        throw new Error('RETRIEVED_THREAD.NOT_FOUND');
      }
    }
  }
  
  module.exports = RetrivedThread;
  