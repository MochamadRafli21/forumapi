const DeleteReply = require('../../Domains/replies/entities/DeleteReply');
const VerifyReply = require('../../Domains/replies/entities/VerifyReply');

class DeleteReplytUseCase {
  constructor({ 
    commentRepository,
    replyRepository,
    threadRepository
   }) {
    
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._replyRepository = replyRepository;
  }

  async execute(useCasePayload) {
    const deleteReply = new DeleteReply(useCasePayload);
    await this._threadRepository.verifyThreadAvaibility(deleteReply.thread);
    await this._commentRepository.getComment(deleteReply.comment);
    const verifyReply = new VerifyReply({
        reply: useCasePayload.reply,
        owner: useCasePayload.owner
      })
    await this._replyRepository.verifyReplyOwner(verifyReply);
    return this._replyRepository.deleteReply(deleteReply);
  }
}

module.exports = DeleteReplytUseCase;
