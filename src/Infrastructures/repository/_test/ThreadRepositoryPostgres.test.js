const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const RetrivedThread = require('../../../Domains/threads/entities/RetrivedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

 
describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable()
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
          thread_username: 'dicoding',
          thread_date: createdThread.date,
          comment_id: 'comment-123',
          date: createdComment.date,
          content: 'new comment',
          owner: 'dicoding'
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
          owner: ''
        }
      ]));
    });
  });
});