const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddedLike = require('../../../Domains/likes/entities/addedLike');
const DeleteLike = require('../../../Domains/likes/entities/deleteLike');
const VerifyLike = require('../../../Domains/likes/entities/verifyLike');
const addLike = require('../../../Domains/likes/entities/addLike');
const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');


describe('LikeRepositoryPostgres', () => {
  afterEach(async () => {
    await LikesTableTestHelper.cleanTable();
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
        content: 'new comment',
        owner: 'user-123'
    })
  })
 
  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });
 
  describe('add like function', () => {
    it('should persist created like', async () => {

      const createLike = new addLike({
        owner: 'user-123',
        comment: 'comment-123',
        thread: 'thread-123'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await likeRepositoryPostgres.addLike(createLike);

      // Assert
      const likes = await LikesTableTestHelper.findLikedByOwnerAndComments('user-123', 'comment-123')
      expect(likes).toHaveLength(1);
    });

    it('should return created likes correctly', async () => {
      // Arrange
      const createLike = new addLike({
        owner: 'user-123',
        content: 'new comment',
        comment: 'comment-123',
        thread: 'thread-123'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedLike = await likeRepositoryPostgres.addLike(createLike);

      // Assert
      expect(addedLike).toStrictEqual(new AddedLike({
        id:'like-123',
        comment: 'comment-123',
        owner: 'user-123',
      }));
    });
  });

  describe('delete likes function', () => {
    it('should remove like', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      await LikesTableTestHelper.addLike({
        owner: 'user-123',
        comment: 'comment-123',
      });
      const likes = await LikesTableTestHelper.findLikedByOwnerAndComments('user-123', 'comment-123')
      const deleteLikes = new DeleteLike({
        like:likes[0].id,
        owner:likes[0].owner,
        thread:'thread-123',
        comment:likes[0].comment,
      })
      // Action
     await likeRepositoryPostgres.deleteLike(deleteLikes)
      // Assert
      const likes2 = await LikesTableTestHelper.findLikedByOwnerAndComments('user-123', 'comment-123')
      expect(likes2).toHaveLength(0);
    });
  });

  describe('retrive likes by comment and owner id function', () => { 
    it('should return verified likes if owner and comment match with payload', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      await LikesTableTestHelper.addLike({
        owner: 'user-123',
        comment: 'comment-123',
      });
      const likes = await LikesTableTestHelper.findLikedByOwnerAndComments('user-123', 'comment-123')
      const verifyLike= new VerifyLike({
        comment:likes[0].comment,
        owner:likes[0].owner,
      })
      // Action
     const likes2 = await likeRepositoryPostgres.retriveLikesByOwnerAndComment(verifyLike)
      // Assert
      expect(likes2.is_exist).toEqual(true);
    });
   })
});