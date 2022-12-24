class VerifyReply {
    constructor({ reply, owner }) {
      if (!reply, !owner ) {
        throw new Error('VERIFY_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof reply !== 'string' || typeof owner !== 'string') {
        throw new Error('VERIFY_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.reply = reply
      this.owner = owner
    }
  }
  
  module.exports = VerifyReply;