const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const VerifiedReply = require('../../../Domains/replies/entities/VerifiedReply');
const VerifyReply = require('../../../Domains/replies/entities/VerifyReply');
const DeleteReplytUseCase = require('../DeleteReplyUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeletedReply = require('../../../Domains/replies/entities/DeletedReply');
const VerifiedThread = require('../../../Domains/threads/entities/VerifiedThread');
const RetrivedComment = require('../../../Domains/comments/entities/RetrivedComment');
 
describe('DeleteReplytUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123',
      reply: 'reply-123',
    };

    const useCaseVerifPayload = new VerifyReply({
        owner:'user-123',
        reply: 'reply-123',
    });

    const expectedStatusReply =new DeletedReply ({
      id:'reply-123',
      is_deleted: true
    })
 
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockCommentRepository.verifyCommentAvaibility = jest.fn()
      .mockImplementation(() => Promise.resolve(new RetrivedComment(
        [{
          id:'comment-123',
          is_deleted:false
        }]
      )));
    mockReplyRepository.verifyReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(new VerifiedReply({
        id:'reply-123',
        owner:'user-123',
        payload_owner:'user-123'
      })));
    mockReplyRepository.deleteReply = jest.fn()
      .mockImplementation(() => Promise.resolve(new DeletedReply({
        id:'reply-123',
        is_deleted: true
       })));
    mockThreadRepository.verifyThreadAvaibility = jest.fn()
      .mockImplementation(() => Promise.resolve(new VerifiedThread(
        [{
          id:'thread-123'
        }]
      )));
 
    const getReplyUseCase = new DeleteReplytUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository 
    });
    const deletedReply = await getReplyUseCase.execute(useCasePayload);
 
    // check reply exist
    expect(mockThreadRepository.verifyThreadAvaibility)
        .toBeCalledWith('thread-123');
    expect(mockCommentRepository.verifyCommentAvaibility)
        .toBeCalledWith('comment-123');
    expect(mockReplyRepository.verifyReplyOwner)
        .toBeCalledWith(useCaseVerifPayload);
    expect(mockReplyRepository.deleteReply)
        .toBeCalledWith(useCasePayload);
    expect(deletedReply).toStrictEqual(expectedStatusReply)
  });
});