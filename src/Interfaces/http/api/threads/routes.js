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
      method: 'POST',
      path: '/threads/{thread_id}/comments',
      handler: handler.postCommentHandler,
      options: {
        auth: "jwt"
      }
    },
    // {
    //   method: 'DELETE',
    //   path: '/threads/{thread_id}/comment',
    //   handler: handler.deleteCommentHandler,
    //   options: {
    //     auth: "jwt"
    //   }
    // },
  ]);
  
  module.exports = routes;
  