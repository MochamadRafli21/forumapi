const DeleteLike = require('../deleteLike')

describe('a DeleteLike entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "comment":""
        }

        expect(() => new DeleteLike(payload)).toThrowError('DELETE_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should delete like object properly', () => {
        const payload = {
            "owner":"user-123",
            "comment": "comment-123",
        }

        const {comment, owner} = new DeleteLike(payload)

        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})