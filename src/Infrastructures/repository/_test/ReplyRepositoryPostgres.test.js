const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CreateReply = require('../../../Domains/replies/entities/CreateReply');
const DeleteReply = require('../../../Domains/replies/entities/DeleteReply');
const CreatedReply = require('../../../Domains/replies/entities/CreatedReply');
const VerifyReply = require('../../../Domains/replies/entities/VerifyReply')
const pool = require('../../database/postgres/pool');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');

 
describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
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
    await CommentsTableTestHelper.addComment({
        thread: 'thread-123',
        content: 'new reply',
        owner: 'user-123'
    })
  })
 
  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });
 
  describe('createReply function', () => {
    it('should persist created reply', async () => {

      const createReply = new CreateReply({
        owner: 'user-123',
        content: 'new comment',
        comment: 'comment-123',
        thread: 'thread-123'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.addReply(createReply);

      // Assert
      const replies = await RepliesTableTestHelper.findReplydById('reply-123')
      expect(replies).toHaveLength(1);
    });

    it('should return created reply correctly', async () => {
      // Arrange
      const createReply = new CreateReply({
        owner: 'user-123',
        content: 'new comment',
        comment: 'comment-123',
        thread: 'thread-123'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const createdReply = await replyRepositoryPostgres.addReply(createReply);

      // Assert
      expect(createdReply).toStrictEqual(new CreatedReply({
        id: 'reply-123',
        owner: 'user-123',
        content: 'new comment'
      }));
    });
  });

  describe('deleteReply function', () => {
    it('should remove reply', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await RepliesTableTestHelper.addReply({
        owner: 'user-123',
        content: 'new comment',
        comment: 'comment-123',
      });
      const replies = await RepliesTableTestHelper.findReplydById('reply-123')
      const deleteReply = new DeleteReply({
        reply:replies[0].id,
        owner:replies[0].owner,
        thread:'thread-123',
        comment:replies[0].comment,
      })
      // Action
     await replyRepositoryPostgres.deleteReply(deleteReply)
      // Assert
      const replies2 = await RepliesTableTestHelper.findReplydById('reply-123')
      expect(replies2[0].is_deleted).toEqual(true);
    });
  });

  describe('verifyReplyOwner function', () => { 
    it('should return verified reply if owner match with payload', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await RepliesTableTestHelper.addReply({
        owner: 'user-123',
        content: 'new comment',
        comment: 'comment-123',
      });
      const replies = await RepliesTableTestHelper.findReplydById('reply-123')
      const verifyReply = new VerifyReply({
        reply:replies[0].id,
        owner:replies[0].owner,
      })
      // Action
     const replies2 = await replyRepositoryPostgres.verifyReplyOwner(verifyReply)
      // Assert
      expect(replies2.status).toEqual('success');
    });
   })
});