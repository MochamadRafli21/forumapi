class CommentRepository {
    async addComment(createComment) {
      throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteComment(deleteComment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    
    async verifyCommentOwner(verifyComment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async verifyCommentAvaibility(idComment) {
      throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }

  module.exports = CommentRepository;