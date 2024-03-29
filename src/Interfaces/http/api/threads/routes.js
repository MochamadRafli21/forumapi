const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads',
      handler: handler.postThreadHandler,
      options: {
        auth: "jwt"
      }
    },
    {
      method: 'GET',
      path: '/threads/{thread_id}',
      handler: handler.getThreadHandler,
    },
    {
      method: 'POST',
      path: '/threads/{thread_id}/comments',
      handler: handler.postCommentHandler,
      options: {
        auth: "jwt"
      }
    },
    {
      method: 'DELETE',
      path: '/threads/{thread_id}/comments/{comment_id}',
      handler: handler.deleteCommentHandler,
      options: {
        auth: "jwt"
      }
    },
    {
      method: 'POST',
      path: '/threads/{thread_id}/comments/{comment_id}/replies',
      handler: handler.postReplyHandler,
      options: {
        auth: "jwt"
      }
    },
    {
      method: 'DELETE',
      path: '/threads/{thread_id}/comments/{comment_id}/replies/{reply_id}',
      handler: handler.deleteReplyHandler,
      options: {
        auth: "jwt"
      }
    },
    {
      method: 'PUT',
      path: '/threads/{thread_id}/comments/{comment_id}/likes',
      handler: handler.likeCommentHandler,
      options: {
        auth: "jwt"
      }
    }
  ]);
  
  module.exports = routes;
  