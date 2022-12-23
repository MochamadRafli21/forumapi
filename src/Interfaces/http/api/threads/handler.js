const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUsecase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
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
    const {_, id:owner } = request.auth.credentials

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
}

module.exports = ThreadsHandler;
