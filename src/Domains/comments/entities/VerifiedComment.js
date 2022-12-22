class VerifiedComment {
    constructor({ id, owner, payload_owner }) {
      if (!id || !owner || !payload_owner) {
        throw new Error('VERIFIED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof id !== 'string'|| typeof owner !== 'string'|| typeof payload_owner !== 'string') {
        throw new Error('VERIFIED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      if(owner === payload_owner){
        this.status = 'success'
      }else{
        throw new Error('VERIFIED_COMMENT.OWNER_NOT_MATCH')
      }
    }
  }
  
  module.exports = VerifiedComment;