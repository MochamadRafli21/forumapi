const CreateReply = require('../CreateReply')

describe('a CreateReply entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "content":"",
            "comment":"",
            "thread":""
        }

        expect(() => new CreateReply(payload)).toThrowError('CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not match data type specification', () => {
        const payload = {
            "thread": 123,
            "owner": 123,
            "comment":123,
            "content": true
        }

        expect(() => new CreateReply(payload)).toThrowError('CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create reply object properly', () => {
        const payload = {
            "owner":"user-123",
            "comment":"comment-123",
            "thread": "thread-123 ",
            "content": "text for testing"
        }

        const {thread,comment, content, owner} = new CreateReply(payload)

        expect(thread).toMatch(payload.thread);
        expect(content).toMatch(payload.content);
        expect(comment).toMatch(payload.comment);
        expect(owner).toMatch(payload.owner);
    });
})