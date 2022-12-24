const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const DeleteReplytUseCase = require('../DeleteReplyUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
 
describe('DeleteReplytUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123',
      reply: 'reply-123',
    };

    const useCaseVerifPayload = {
        owner:'user-123',
        reply: 'reply-123',
      };

    const expectedStatusReply = {
        'status': "success"
    }
 
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockCommentRepository.getComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.verifyReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedStatusReply));
    mockReplyRepository.deleteReply = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedStatusReply));
    mockThreadRepository.getThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
 
    const getReplyUseCase = new DeleteReplytUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository 
    });
    const deletedReply = await getReplyUseCase.execute(useCasePayload);
 
    // check reply exist
    expect(mockReplyRepository.verifyReplyOwner)
        .toHaveBeenCalledWith(useCaseVerifPayload);
    expect(mockReplyRepository.deleteReply)
        .toHaveBeenCalledWith(useCasePayload);
    expect(deletedReply).toStrictEqual({
        'status':'success'
    })
  });
});