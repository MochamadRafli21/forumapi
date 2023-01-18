const AddLike = require('../addLike')

describe('a AddLike entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "comment":"",
        }

        expect(() => new AddLike(payload)).toThrowError('ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should create like object properly', () => {
        const payload = {
            "owner":"user-123",
            "comment":"comment-123",
        }

        const {comment, owner} = new AddLike(payload)

        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})