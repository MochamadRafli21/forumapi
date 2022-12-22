const DeleteComment = require('../DeleteComment')

describe('a DeleteComment entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "comment":"",
            "thread":""
        }

        expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should delete comment object properly', () => {
        const payload = {
            "owner":"user-123",
            "thread": "thread-123 ",
            "comment": "comment-123"
        }

        const {thread, comment, owner} = new DeleteComment(payload)

        expect(thread).toMatch(payload.thread);
        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})