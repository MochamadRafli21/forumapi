const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
// const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    // this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
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

  // async deleteCommentHandler(request, h) {
  //   const { thread_id } = request.params;
  //   const {_, id:owner } = request.auth.credentials

  //   const payload = {
  //     'thread':thread_id,
  //     'owner':owner
  //   }

  //   const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
  //   const deletedComment = await deleteCommentUseCase.execute(payload);

  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       addedComment,
  //     },
  //   });
  //   response.code(201);
  //   return response;
  // }
}

module.exports = ThreadsHandler;
