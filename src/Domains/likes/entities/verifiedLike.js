class VerifiedLike {
    constructor({ comment, owner }) {
      this.is_exist =  !comment || !owner ? false:true 
    }
  }
  
  module.exports = VerifiedLike;