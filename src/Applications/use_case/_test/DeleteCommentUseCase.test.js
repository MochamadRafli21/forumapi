const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeletedComment = require('../../../Domains/comments/entities/DeletedComment');
const VerifiedComment = require('../../../Domains/comments/entities/VerifiedComment');
const VerifiedThread = require('../../../Domains/threads/entities/VerifiedThread');
const VerifyComment = require('../../../Domains/comments/entities/VerifyComment');
 
describe('const DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123',
    };

    const useCaseVerifPayload = new VerifyComment ({
        owner:'user-123',
        comment: 'comment-123',
      });

    const useCaseVerifThreadPayload = "thread-123"

    const expectedDeleteStatusComment = new DeletedComment({
      id:"comment-123",
      is_deleted:true,
    })
 
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(new VerifiedComment({
        owner:'user-123',
        payload_owner:'user-123',
        id: 'comment-123',
      })));
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new DeletedComment({
        id:"comment-123",
        is_deleted:true,
      })));
    mockThreadRepository.verifyThreadAvaibility = jest.fn()
      .mockImplementation(() => Promise.resolve(new VerifiedThread([
        {
          id:"thread-123",
        }
      ])));
 
    const getCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository 
    });
    const deletedComment = await getCommentUseCase.execute(useCasePayload);
 
    // check comment exist
    expect(mockCommentRepository.verifyCommentOwner)
        .toBeCalledWith(useCaseVerifPayload);
    expect(mockThreadRepository.verifyThreadAvaibility)
        .toBeCalledWith(useCaseVerifThreadPayload);
    expect(mockCommentRepository.deleteComment)
        .toBeCalledWith(useCasePayload);
    expect(deletedComment).toStrictEqual(expectedDeleteStatusComment)
  });
});