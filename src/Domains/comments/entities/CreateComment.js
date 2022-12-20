class CreateComment {
    constructor({ thread, content, owner }) {
      if (!thread || !content || !owner ) {
        throw new Error('CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof content !== "string") {
        throw new Error('CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.thread = thread
      this.content = content
      this.owner = owner
    }
  }
  
  module.exports = CreateComment;