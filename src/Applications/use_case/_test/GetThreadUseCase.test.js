const RetrivedThread = require('../../../Domains/threads/entities/RetrivedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUsecase');

describe('const GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const thread_id = 'thread-123'
    const dummyDate = new Date(Date.now())
    const isoDate = dummyDate.toISOString()
    const expectedRetrivedThread =new RetrivedThread([
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          owner: 'dicoding',
          thread_date: isoDate,
          comment_id: 'comment-123',
          content: 'new comment',
          thread_username: 'dicoding',
          date: isoDate,
          is_deleted: false,
          reply_id: 'reply-123',
          reply_content: 'new reply',
          reply_date: isoDate,
          reply_username: 'dicoding',
          reply_is_deleted: false
        }
      ])
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getThread = jest.fn()
      .mockImplementation(() => Promise.resolve(new RetrivedThread([{
        thread_id: 'thread-123',
        thread_title: 'new thread',
        thread_body: 'is it really that hard bro?',
        owner: 'dicoding',
        thread_date: isoDate,
        comment_id: 'comment-123',
        content: 'new comment',
        thread_username: 'dicoding',
        date: isoDate,
        is_deleted: false,
        reply_id: 'reply-123',
        reply_content: 'new reply',
        reply_date: isoDate,
        reply_username: 'dicoding',
        reply_is_deleted: false
      }])));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository 
    });

    const retrivedThread = await getThreadUseCase.execute(thread_id);

    expect(retrivedThread).toStrictEqual(expectedRetrivedThread);
    expect(mockThreadRepository.getThread).toBeCalledWith(thread_id);
  });
});