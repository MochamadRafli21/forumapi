class RetrivedThread {
    constructor(payload) {

      this._verifyPayload(payload);
  
      const { thread_id, thread_title, thread_body, thread_username, thread_date, comment_id } = payload[0];
  
      this.id = thread_id;
      this.title = thread_title;
      this.body = thread_body;
      this.username = thread_username;
      this.date = thread_date
      this.comments = [];
      let idcomments = payload.map(({ comment_id }) => comment_id)
      const comments_array = payload.filter(
        (value, index)=>{
          return idcomments.indexOf(value.comment_id) === index;
        }
      )
  
      if(comment_id){
        for(let i = 0; i < comments_array.length; i++){
          let comment = {}
          if(!comments_array[i].is_deleted){
            comment = {
              'id': comments_array[i].comment_id,
              'content': comments_array[i].content,
              'username': comments_array[i].owner,
              'date':comments_array[i].date,
              'likeCount':0,
              'replies':[]
            }
          }else{
            comment = {
              'id': comments_array[i].comment_id,
              'content': '**komentar telah dihapus**',
              'username': comments_array[i].owner,
              'date':comments_array[i].date,
              'likeCount':0,
              'replies':[]
            }
          }
          if(comments_array[i].reply_id){
            const replies = payload.filter(
              (x) => {
                return x.comment_id === comment.id
              }
            )
            for(let j = 0; j < replies.length; j++){
              let reply = {}
              if(!replies[j].reply_is_deleted){
                reply = {
                  'id': replies[j].reply_id,
                  'content': replies[j].reply_content,
                  'username': replies[j].reply_username,
                  'date':replies[j].reply_date
                }
              }else{
                reply = {
                  'id': replies[j].reply_id,
                  'content': '**balasan telah dihapus**',
                  'username': replies[j].reply_username,
                  'date':replies[j].reply_date
                }
              }
              comment.replies.push(reply)
            }
          }
          if(comments_array[i].like){
            const like_array = payload.filter(
              (l) => {
                return l.comment_id === comment_id
              }
            )
            comment.likeCount = like_array.length
          }
          this.comments.push(comment)
        };
      }
    }
  
    _verifyPayload(payload) {
      if (payload.length === 0) {
        throw new Error('RETRIEVED_THREAD.NOT_FOUND');
      }
    }
  }
  
  module.exports = RetrivedThread;
  