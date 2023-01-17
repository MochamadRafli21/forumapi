const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const RetrivedThread = require('../../../Domains/threads/entities/RetrivedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

 
describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await LikesTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret_password',
      });
  })
 
  afterAll(async () => {
    await UsersTableTestHelper.cleanTable()
    await pool.end();
  });
 
  describe('createThread function', () => {
    it('should persist created thread', async () => {

        const createThread = new ThreadCreate({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      await threadRepositoryPostgres.addThread(createThread);
 
      // Assert
      const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });
 
    it('should return created thread correctly', async () => {
      // Arrange
      const createThread = new ThreadCreate({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      const createdThread = await threadRepositoryPostgres.addThread(createThread);
 
      // Assert
      expect(createdThread).toStrictEqual(new CreatedThread({
        id: 'thread-123',
        owner: 'user-123',
        title: 'new thread'
      }));
    });
  });

  describe('getThread function', () => {
    it('should return retrived thread with comment correctly', async () => { 
      // Arrange
      const createdThread = await ThreadsTableTestHelper.addThread({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });
      const createdComment = await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      })

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Assert
      const createdThreadTable = await threadRepositoryPostgres.getThread('thread-123')
      expect(createdThreadTable).toStrictEqual(new RetrivedThread(
      [
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          owner: 'dicoding',
          thread_date: createdThread.date,
          comment_id: 'comment-123',
          content: 'new comment',
          thread_username: 'dicoding',
          date: createdComment.date,
          is_deleted: false,
          reply_id: null,
          reply_content: null,
          reply_date: null,
          reply_username: null,
          reply_is_deleted: null
        }
      ]));
    });

    it('should return retrived thread with reply correctly', async () => { 
      // Arrange
      const createdThread = await ThreadsTableTestHelper.addThread({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });
      const createdComment = await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const createdReply = await RepliesTableTestHelper.addReply({
        owner: 'user-123',
        content: 'new reply',
        comment: 'comment-123',
      })

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Assert
      const createdThreadTable = await threadRepositoryPostgres.getThread('thread-123')
      expect(createdThreadTable).toStrictEqual(new RetrivedThread(
      [
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          owner: 'dicoding',
          thread_date: createdThread.date,
          comment_id: 'comment-123',
          content: 'new comment',
          thread_username: 'dicoding',
          date: createdComment.date,
          is_deleted: false,
          reply_id: createdReply.id,
          reply_content: createdReply.content,
          reply_date: createdReply.date,
          reply_username: 'dicoding',
          reply_is_deleted: createdReply.is_deleted
        }
      ]));
    });


    it('should return retrived thread with like correctly', async () => { 
      // Arrange
      const createdThread = await ThreadsTableTestHelper.addThread({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });
      const createdComment = await CommentsTableTestHelper.addComment({
        owner: 'user-123',
        content: 'new comment',
        thread: 'thread-123',
      });
      const createdReply = await RepliesTableTestHelper.addReply({
        owner: 'user-123',
        content: 'new reply',
        comment: 'comment-123',
      })

      await LikesTableTestHelper.addLike({
        owner:'user-123',
        comment:'comment-123',
      })

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Assert
      const createdThreadTable = await threadRepositoryPostgres.getThread('thread-123')
      expect(createdThreadTable).toStrictEqual(new RetrivedThread(
      [
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          owner: 'dicoding',
          thread_date: createdThread.date,
          comment_id: 'comment-123',
          content: 'new comment',
          thread_username: 'dicoding',
          date: createdComment.date,
          is_deleted: false,
          reply_id: createdReply.id,
          reply_content: createdReply.content,
          reply_date: createdReply.date,
          reply_username: 'dicoding',
          reply_is_deleted: createdReply.is_deleted,
          like:'like-123'
        }
      ]));
    });

    it('should return retrived thread without comment correctly', async () => { 
      // Arrange
      const createdThread = await ThreadsTableTestHelper.addThread({
        owner: 'user-123',
        title: 'new thread',
        body: 'is it really that hard bro?',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Assert
      const createdThreadTable = await threadRepositoryPostgres.getThread('thread-123')
      expect(createdThreadTable).toStrictEqual(new RetrivedThread(
      [
        {
          thread_id: 'thread-123',
          thread_title: 'new thread',
          thread_body: 'is it really that hard bro?',
          thread_date: createdThread.date,
          thread_username: 'dicoding',
          date: '',
          comment_id: '',
          content: '',
          owner: '',
          reply_id: null,
          reply_content: null,
          reply_date: null,
          reply_username: null,
          reply_is_deleted: null
        }
      ]));
    });
  });


  describe('verifyThreadAvaibility function', () => {
    it('should return success true if thread found', async () => {

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      const created_thread = await ThreadsTableTestHelper.addThread({
        owner: 'user-123',
        title: 'new title',
        body: 'new thread',
      });
      // Action
     const threads = await threadRepositoryPostgres.verifyThreadAvaibility(created_thread.id)
      // Assert
      expect(threads.success).toEqual('true');
    });
  });
});