const DeleteReply = require('../DeleteReply')

describe('a DeleteReply entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "reply":"",
            "thread": "",
            "comment":""
        }

        expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should delete comment object properly', () => {
        const payload = {
            "owner":"user-123",
            "reply": "reply-123 ",
            "comment": "comment-123",
            "thread": "thread-123",
        }

        const {reply, comment, owner} = new DeleteReply(payload)

        expect(reply).toMatch(payload.reply);
        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})