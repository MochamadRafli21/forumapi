const CreateComment = require('../../Domains/comments/entities/CreateComment');

class AddCommentUseCase {
  constructor({ 
    commentRepository,
    threadRepository
   }) {
    
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadAvaibility(useCasePayload.thread)
    const createComment = new CreateComment(useCasePayload);
    return await this._commentRepository.addComment(createComment);
  }
}

module.exports = AddCommentUseCase;
