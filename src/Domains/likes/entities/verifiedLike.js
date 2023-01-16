class VerifiedLike {
    constructor({ comment, owner }) {
      if (typeof comment !== 'string'|| typeof owner !== 'string') {
        throw new Error('VERIFIED_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.is_exist =  !comment || !owner ? false:true 
    }
  }
  
  module.exports = VerifiedLike;