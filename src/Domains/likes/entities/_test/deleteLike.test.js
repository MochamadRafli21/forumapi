const DeleteLike = require('../deleteLike')

describe('a DeleteLike entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "like":"",
            "thread": "",
            "comment":""
        }

        expect(() => new DeleteLike(payload)).toThrowError('DELETE_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should delete like object properly', () => {
        const payload = {
            "owner":"user-123",
            "like": "like-123 ",
            "comment": "comment-123",
            "thread": "thread-123",
        }

        const {like, comment, owner, thread} = new DeleteLike(payload)

        expect(like).toMatch(payload.like);
        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
        expect(thread).toMatch(payload.thread);
    });
})