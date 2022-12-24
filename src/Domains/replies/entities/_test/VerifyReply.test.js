const VerifyReply = require('../VerifyReply')

describe('a VerifyReply entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "reply":"",
            "owner":"",
        }

        expect(() => new VerifyReply(payload)).toThrowError('VERIFY_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data types', () => {
        const payload = {
            "reply": 123,
            "owner": 123
        }

        expect(() => new VerifyReply(payload)).toThrowError('VERIFY_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');

    });

    it('should verify replies object properly', () => {
        const payload = {
            "reply": "reply-123",
            "owner": "user-123"
        }

        const {reply, owner} = new VerifyReply(payload)

        expect(reply).toMatch(payload.reply);
        expect(owner).toMatch(payload.owner);
    });
})