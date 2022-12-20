const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const RetrivedThread = require('../../../Domains/threads/entities/RetrivedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

 
describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
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

  describe('getThreadById function', () => {
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
      const createdThreadTable = await threadRepositoryPostgres.getThreadById(createdThread.id)
      expect(createdThreadTable).toStrictEqual(new RetrivedThread({
        id: 'thread-123',
        owner: 'user-123',
        title: 'new thread'
      }));
    });
  });
});