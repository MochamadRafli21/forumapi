const CreateReply = require('../../../Domains/replies/entities/CreateReply');
const CreatedReply = require('../../../Domains/replies/entities/CreatedReply');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const AddReplyUseCase = require('../AddReplyUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const VerifiedReply = require('../../../Domains/replies/entities/VerifiedReply');
const VerifiedThread = require('../../../Domains/threads/entities/VerifiedThread');
const RetrivedComment = require('../../../Domains/comments/entities/RetrivedComment');
 
describe('const AddReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123',
      content: 'secret-reply',
    };
    const expectedCreatedReply=new CreatedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });
 
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();
    const mockThreadRepository = new ThreadRepository();

    mockReplyRepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(new CreatedReply({
        id: 'reply-123',
        content: 'secret-reply' ,
        owner: 'user-123',
      })));
    mockThreadRepository.verifyThreadAvaibility = jest.fn()
      .mockImplementation(() => Promise.resolve(new VerifiedThread([
        {
          id:'thread-123',
        }
      ])));
    mockCommentRepository.verifyCommentAvaibility = jest.fn()
      .mockImplementation(() => Promise.resolve(new RetrivedComment(
        [{
          id:'comment-123',
          is_deleted:false
        }]
      )));
 
    const getReplyUseCase = new AddReplyUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository 
    });
 
    const createdReply = await getReplyUseCase.execute(useCasePayload);
 
    expect(createdReply).toStrictEqual(expectedCreatedReply);
    expect(mockThreadRepository.verifyThreadAvaibility).toBeCalledWith('thread-123');
    expect(mockCommentRepository.verifyCommentAvaibility).toBeCalledWith('comment-123');
    expect(mockReplyRepository.addReply).toBeCalledWith(new CreateReply({
      owner: useCasePayload.owner,
      thread: useCasePayload.thread,
      comment: useCasePayload.comment,
      content: useCasePayload.content,
    }));
  });
});