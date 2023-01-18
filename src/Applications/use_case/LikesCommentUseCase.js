const AddLike = require('../../Domains/likes/entities/addLike');
const DeleteLike = require('../../Domains/likes/entities/deleteLike');
const VerifyLike = require('../../Domains/likes/entities/verifyLike');

class LikesCommentUseCase {
  constructor({ 
    commentRepository,
    likesRepository,
    threadRepository
   }) {
    
    this._commentRepository = commentRepository;
    this._likeRepository = likesRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadAvaibility(useCasePayload.thread);
    await this._commentRepository.verifyCommentAvaibility(useCasePayload.comment);
    const verifyLike = new VerifyLike({owner:useCasePayload.owner, comment:useCasePayload.comment}) 
    const exist = await this._likeRepository.retriveLikesByOwnerAndComment(verifyLike);
    if(exist.is_exist){
        const deleteLike = new DeleteLike({owner:useCasePayload.owner, comment:useCasePayload.comment});
        return await this._likeRepository.deleteLike(deleteLike);
    }else{
        const addLike = new AddLike(useCasePayload);
        return await this._likeRepository.addLike(addLike);
    }
  }
}

module.exports = LikesCommentUseCase;
