const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUsecase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const LikesCommentUseCase = require('../../../../Applications/use_case/LikesCommentUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
    this.likeCommentHandler = this.likeCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const {_, id:owner } = request.auth.credentials
    request.payload.owner = owner

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const { thread_id } = request.params;
    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const retrivedThread = await getThreadUseCase.execute(thread_id);

    const response = h.response({
      status: 'success',
      data: {
        'thread':retrivedThread,
      },
    });
    response.code(200);
    return response;
  }

  async postCommentHandler(request, h) {
    const { thread_id } = request.params;
    const {_, id:owner } = request.auth.credentials
    request.payload.owner = owner
    request.payload.thread = thread_id

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const addedComment = await addCommentUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h) {
    const { thread_id, comment_id } = request.params;
    const {_, id:owner } = request.auth.credentials;

    const payload = {
      'thread':thread_id,
      'comment':comment_id,
      'owner':owner
    }

    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const deletedComment = await deleteCommentUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        deletedComment,
      },
    });
    response.code(200);
    return response;
  }

  async postReplyHandler(request, h){
    const { thread_id, comment_id } = request.params;
    const {_, id:owner } = request.auth.credentials;

    request.payload.thread = thread_id
    request.payload.comment = comment_id
    request.payload.owner = owner

    const createReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const createdReply = await createReplyUseCase.execute(request.payload)

    const response = h.response({
      status: 'success',
      data: {
        addedReply: createdReply
      },
    });
    response.code(201)
    return response
  }

  async deleteReplyHandler(request, h) {
    const { thread_id, comment_id, reply_id } = request.params;
    const {_, id:owner } = request.auth.credentials;

    const payload = {
      'thread':thread_id,
      'comment':comment_id,
      'reply': reply_id,
      'owner':owner
    }

    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    const deletedReply = await deleteReplyUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        deletedReply,
      },
    });
    response.code(200);
    return response;
  }

  async likeCommentHandler(request, h){
    const {thread_id, comment_id } = request.params;
    const {_, id:owner } = request.auth.credentials;

    const payload = {
      'thread': thread_id,
      'comment': comment_id,
      'owner': owner,
    }

    const likeCommentUseCase = this._container.getInstance(LikesCommentUseCase.name);
    await likeCommentUseCase.execute(payload)

    const response = h.response({
      status: 'success'
    });
    response.code(200);
    return response;
  }

}

module.exports = ThreadsHandler;
