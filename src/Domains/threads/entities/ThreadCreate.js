class ThreadCreate {
    constructor({ title, body, owner }) {
      if (!title || !body || !owner ) {
        throw new Error('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }

      if (typeof title !== "string" || typeof body !== "string") {
        throw new Error('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }

      this.title = title
      this.body = body
      this.owner = owner
    }
  }
  
  module.exports = ThreadCreate;