const verifyLike = require('../verifyLike')

describe('a verifyLike entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "comment":"",
            "owner":"",
        }

        expect(() => new verifyLike(payload)).toThrowError('VERIFY_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data types', () => {
        const payload = {
            "comment": 123,
            "owner": 123
        }

        expect(() => new verifyLike(payload)).toThrowError('VERIFY_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');

    });

    it('should verify likes object properly', () => {
        const payload = {
            "comment": "comment-123",
            "owner": "user-123"
        }

        const {comment, owner} = new verifyLike(payload)

        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})