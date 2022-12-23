const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
 
describe('const DeleteCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123',
    };

    const useCaseVerifPayload = {
        owner:'user-123',
        comment: 'comment-123',
      };

    const expectedStatusComment = {
        'status': "success"
    }
 
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve({'status':'success'}));
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedStatusComment));
    mockThreadRepository.getThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
 
    const getCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository 
    });
    const deletedComment = await getCommentUseCase.execute(useCasePayload);
 
    // check comment exist
    expect(mockCommentRepository.verifyCommentOwner)
        .toHaveBeenCalledWith(useCaseVerifPayload);
    expect(mockCommentRepository.deleteComment)
        .toHaveBeenCalledWith(useCasePayload);
    expect(deletedComment).toStrictEqual({
        'status':'success'
    })
  });
});