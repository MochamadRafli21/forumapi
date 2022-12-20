const CreateComment = require('../CreateComment')

describe('a CreateComment entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "content":"",
            "thread":""
        }

        expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not match data type specification', () => {
        const payload = {
            "thread": 123,
            "owner": 123,
            "content": true
        }

        expect(() => new CreateComment(payload)).toThrowError('CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create comment object properly', () => {
        const payload = {
            "owner":"user-123",
            "thread": "thread-123 ",
            "content": "text for testing"
        }

        const {thread, content, owner} = new CreateComment(payload)

        expect(thread).toMatch(payload.thread);
        expect(content).toMatch(payload.content);
        expect(owner).toMatch(payload.owner);
    });
})