const VerifyComment = require('../VerifyComment')

describe('a VerifyComment entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "comment":"",
            "owner":"",
        }

        expect(() => new VerifyComment(payload)).toThrowError('VERIFY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data types', () => {
        const payload = {
            "comment": 123,
            "owner": 123
        }

        expect(() => new VerifyComment(payload)).toThrowError('VERIFY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');

    });

    it('should verify comment object properly', () => {
        const payload = {
            "comment": "comment-123",
            "owner": "user-123"
        }

        const {comment, owner} = new VerifyComment(payload)

        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})