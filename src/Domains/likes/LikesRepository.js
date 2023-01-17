class LikesRepository {
    async addLike(createLike) {
      throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteLike(deleteLike) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
    
    async retriveLikesByOwnerAndComment(verifyLikes) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
  }

  module.exports = LikesRepository;