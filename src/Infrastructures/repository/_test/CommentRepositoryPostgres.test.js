const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CreateComment = require('../../../Domains/comments/entities/CreateComment');
const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const VerifyComment = require('../../../Domains/comments/entities/VerifyComment')
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

 
describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret_password',
      });
    await ThreadsTableTestHelper.addThread({
        title: 'new thread',
        body: 'new body',
        owner: 'user-123'
    })
  })
 
  afterAll(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
    await pool.end();
  });
 
  describe('createComment function', () => {
    it('should persist created comment', async () => {

      const createComment = new CreateComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      await commentRepositoryPostgres.addComment(createComment);
 
      // Assert
      const comments = await CommentsTableTestHelper.findCommentdById('comment-123')
      expect(comments).toHaveLength(1);
    });
 
    it('should return created comment correctly', async () => {
      // Arrange
      const createComment = new CreateComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      const createdComment = await commentRepositoryPostgres.addComment(createComment);
 
      // Assert
      expect(createdComment).toStrictEqual(new CreatedComment({
        id: 'comment-123',
        owner: 'user-123',
        content: 'new comment'
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should remove comment', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const comments = await CommentsTableTestHelper.findCommentdById('comment-123')
      const deleteComment = new DeleteComment({
        comment:comments[0].id,
        owner:comments[0].owner,
        thread:comments[0].thread
      })
      // Action
     const comment_2 = await commentRepositoryPostgres.deleteComment(deleteComment)
      // Assert
      expect(comment_2.is_deleted).toEqual(true);
    });
  });


  describe('retriveComment function', () => {
    it('should return id of comment', async () => {

      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const created_comment = await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      // Action
     const comments = await commentRepositoryPostgres.getComment(created_comment.id)
      // Assert
      expect(comments.id).toEqual(created_comment.id);
      expect(comments.is_deleted).toBeFalsy();
    });
  });


  describe('verifyCommentOwner function', () => { 
    it('should return verified reply if owner match with payload', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const comments = await CommentsTableTestHelper.findCommentdById('comment-123')
      const verifyComment = new VerifyComment({
        comment:comments[0].id,
        owner:comments[0].owner,
      })
      // Action
     const comment = await commentRepositoryPostgres.verifyCommentOwner(verifyComment)
      // Assert
      expect(comment.status).toEqual('success');
    });
   })
});