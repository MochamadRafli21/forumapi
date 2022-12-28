class VerifiedThread {
    constructor(payload) {
      if (payload.length == 0) {
        throw new Error('VERIFIED_THREAD.NOT_FOUND');
      }

      this.success = "true"
    }
  }
  
  module.exports = VerifiedThread;