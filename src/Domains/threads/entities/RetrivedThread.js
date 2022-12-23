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
      if(comment_id){
        for(let i = 0; i < payload.length; i++){
          let comment = {
            'id': payload[i].comment_id,
            'content': payload[i].content,
            'username': payload[i].owner,
            'date':payload[i].date
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
  