const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const VerifiedThread = require('../../../Domains/threads/entities/VerifiedThread');
const RetrivedComment = require('../../../Domains/comments/entities/RetrivedComment');
const AddedLike = require('../../../Domains/likes/entities/addedLike');
const LikesRepository = require('../../../Domains/likes/LikesRepository');
const LikesCommentUseCase = require('../LikesCommentUseCase');
const AddLike = require('../../../Domains/likes/entities/addLike'); 
const DeletedLikes = require('../../../Domains/likes/entities/deletedLikes');
const DeleteLike = require('../../../Domains/likes/entities/deleteLike');
const VerifiedLike = require('../../../Domains/likes/entities/verifiedLike');
const VerifyLike = require('../../../Domains/likes/entities/verifyLike');
describe('const LikesCommentUseCase', () => {
  it('should orchestrating the add like action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      thread: 'thread-123',
      comment: 'comment-123'
    };
    const expectedCreatedLike =new AddedLike({
      id: 'like-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });
 
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikesRepository();
    const mockThreadRepository = new ThreadRepository();

    mockLikeRepository.retriveLikesByOwnerAndComment = jest.fn()
        .mockImplementation(() => Promise.resolve(new VerifiedLike({})))
    mockLikeRepository.addLike = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedLike({
        id: 'like-123',
        owner: 'user-123',
      })));
    mockLikeRepository.deleteLike = jest.fn()
      .mockImplementation(() => Promise.resolve(new DeletedLikes({
        id: 'like-123',
        is_deleted: true,
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
 
    const getLikesCommentUseCase = new LikesCommentUseCase({
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
      threadRepository: mockThreadRepository 
    });
 
    const likes = await getLikesCommentUseCase.execute(useCasePayload);
 
    expect(likes).toStrictEqual(expectedCreatedLike);
    expect(mockThreadRepository.verifyThreadAvaibility).toBeCalledWith('thread-123');
    expect(mockCommentRepository.verifyCommentAvaibility).toBeCalledWith('comment-123');
    expect(mockLikeRepository.retriveLikesByOwnerAndComment).toBeCalledWith(new VerifyLike({
        comment: useCasePayload.comment,
        owner:useCasePayload.owner
    }));
    expect(mockLikeRepository.addLike).toBeCalledWith(new AddLike({
      owner: useCasePayload.owner,
      comment: useCasePayload.comment,
    }));
  });
  it('should delete like if exist', async() => {
      // Arrange
      const useCasePayload = {
        owner:'user-123',
        thread: 'thread-123',
        comment: 'comment-123'
      };

      const expectedDeletedLike = new DeletedLikes({
          id:'like-123',
          is_deleted: true
      })
   
      const mockCommentRepository = new CommentRepository();
      const mockLikeRepository = new LikesRepository();
      const mockThreadRepository = new ThreadRepository();
  
      mockLikeRepository.retriveLikesByOwnerAndComment = jest.fn()
          .mockImplementation(() => Promise.resolve(new VerifiedLike({
            comment:'comment-123',
            owner:'user-123'
        })))
      mockLikeRepository.addLike = jest.fn()
        .mockImplementation(() => Promise.resolve(new AddedLike({
          id: 'like-123',
          owner: 'user-123',
        })));
      mockLikeRepository.deleteLike = jest.fn()
        .mockImplementation(() => Promise.resolve(new DeletedLikes({
          id: 'like-123',
          is_deleted: true,
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
   
      const getLikesCommentUseCase = new LikesCommentUseCase({
        commentRepository: mockCommentRepository,
        likeRepository: mockLikeRepository,
        threadRepository: mockThreadRepository 
      });
   
      const delete_likes = await getLikesCommentUseCase.execute(useCasePayload);
   
      expect(delete_likes).toStrictEqual(expectedDeletedLike);
      expect(mockThreadRepository.verifyThreadAvaibility).toBeCalledWith('thread-123');
      expect(mockCommentRepository.verifyCommentAvaibility).toBeCalledWith('comment-123');
      expect(mockLikeRepository.retriveLikesByOwnerAndComment).toBeCalledWith(new VerifyLike({
          comment: useCasePayload.comment,
          owner:useCasePayload.owner
      }));
  
      expect(mockLikeRepository.deleteLike).toBeCalledWith(new DeleteLike({
        comment: useCasePayload.comment,
        owner:useCasePayload.owner
      }))
  })
});