const CreateReply = require('../../Domains/replies/entities/CreateReply');

class AddReplyUseCase {
  constructor({ 
    commentRepository,
    replyRepository,
    threadRepository
   }) {
    
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const createReply = new CreateReply(useCasePayload);
    await this._threadRepository.verifyThreadAvaibility(createReply.thread);
    await this._commentRepository.getComment(createReply.comment);
    return this._replyRepository.addReply(createReply);
  }
}

module.exports = AddReplyUseCase;
