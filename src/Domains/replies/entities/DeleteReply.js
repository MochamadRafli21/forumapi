class DeleteReply {
    constructor({thread, reply, comment, owner }) {
      if (!thread || !reply || !comment || !owner ) {
        throw new Error('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      this.reply = reply
      this.thread = thread
      this.comment = comment
      this.owner = owner
    }
  }
  
  module.exports = DeleteReply;