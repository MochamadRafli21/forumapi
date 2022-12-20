const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CreateComment = require('../../../Domains/comments/entities/CreateComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
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
});