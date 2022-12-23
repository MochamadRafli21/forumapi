const RetrivedThread = require('../../../Domains/threads/entities/RetrivedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUsecase');

describe('const GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const thread_id = 'thread-123'
    const expectedRetrivedThread =new RetrivedThread([
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          thread_username: 'user-123',
          comment_id: 'comment-123',
          content: 'new comment',
          owner: 'user-123'
        }
      ])
    const mockThreadRepository = new ThreadRepository();


    mockThreadRepository.getThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedRetrivedThread));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository 
    });

    const retrivedThread = await getThreadUseCase.execute(thread_id);

    expect(retrivedThread).toStrictEqual(expectedRetrivedThread);
    expect(mockThreadRepository.getThread).toBeCalledWith(thread_id);
  });
});