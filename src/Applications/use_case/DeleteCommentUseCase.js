const DeleteComment = require('../../Domains/comments/entities/DeleteComment');
const VerifyComment = require('../../Domains/comments/entities/VerifyComment');

class DeleteCommentUseCase {
  constructor({ 
    commentRepository,
    threadRepository
   }) {
    
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadAvaibility(useCasePayload.thread);
    const deleteComment = new DeleteComment(useCasePayload);
    const verifyComment = new VerifyComment({
        comment: useCasePayload.comment,
        owner: useCasePayload.owner
      })
    await this._commentRepository.verifyCommentOwner(verifyComment);
    return this._commentRepository.deleteComment(deleteComment);
  
  }
}

module.exports = DeleteCommentUseCase;
