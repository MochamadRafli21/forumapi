const ThreadCreate = require('../ThreadCreate')

describe('a CreateThread entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        //Arrange
        const payload = {
            "owner":"",
            "title":"",
            "body":""
        }

        expect(() => new ThreadCreate(payload)).toThrowError('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not match data type specification', () => {
        const payload = {
            "title": 123,
            "owner": 123,
            "body": true
        }

        expect(() => new ThreadCreate(payload)).toThrowError('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create thread object properly', () => {
        const payload = {
            "owner":"user-123",
            "title": "Newest Thread ",
            "body": "text for testing"
        }

        const {title, body, owner} = new ThreadCreate(payload)

        expect(title).toMatch(payload.title);
        expect(body).toMatch(payload.body);
        expect(owner).toMatch(payload.owner);
    });
})