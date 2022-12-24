class ReplyRepository {
    async addReply(createReply) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteReply(deleteReply) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
    
    async verifyReplyOwner(verifyReply) {
        throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
  }

  module.exports = ReplyRepository;