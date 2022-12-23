
class GetThreadUseCase {
  constructor({ 
    threadRepository,
   }) {
    this._threadRepository = threadRepository;
  }

  async execute(thread_id) {
    return this._threadRepository.getThread(thread_id);
  }
}

module.exports = GetThreadUseCase;
