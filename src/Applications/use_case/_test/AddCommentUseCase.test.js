const CreateComment = require('../../../Domains/comments/entities/CreateComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
 
describe('const AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'new-thread',
      content: 'secret-comment',
    };
    const expectedCreatedComment=new CreatedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });
 
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedComment));
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
 
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository 
    });
 
    const createdComment = await getCommentUseCase.execute(useCasePayload);
 
    expect(createdComment).toStrictEqual(expectedCreatedComment);
    expect(mockCommentRepository.addComment).toBeCalledWith(new CreateComment({
      owner: useCasePayload.owner,
      thread: useCasePayload.thread,
      content: useCasePayload.content,
    }));
  });
});