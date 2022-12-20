const CreateComment = require('../../Domains/comments/entities/CreateComment');

class AddCommentUseCase {
  constructor({ 
    commentRepository,
    threadRepository
   }) {
    console.log(threadRepository)
    
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const test = await this._threadRepository.getThreadById(useCasePayload.thread)
    const createComment = new CreateComment(useCasePayload);
    return this._commentRepository.addComment(createComment);
  }
}

module.exports = AddCommentUseCase;
