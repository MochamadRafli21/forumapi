class CreateReply {
    constructor({thread, comment, content, owner }) {
      if (!thread || !content || !owner || !comment ) {
        throw new Error('CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof content !== "string") {
        throw new Error('CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.thread = thread
      this.comment = comment
      this.content = content
      this.owner = owner
    }
  }
  
  module.exports = CreateReply;