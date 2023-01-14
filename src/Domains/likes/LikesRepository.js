class LikesRepository {
    async addLikes(createLike) {
      throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteLikes(deleteLike) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
    
    async verifyLikesAvailability(verifyLikes) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
  }

  module.exports = LikesRepository;