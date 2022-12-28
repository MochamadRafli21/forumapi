const VerifiedThread = require('../VerifiedThread')

describe('a VerifiedThread entities', () => {

    it('should throw error when payload is empty', () => {
        expect(() => new VerifiedThread([])).toThrowError('VERIFIED_THREAD.NOT_FOUND');
    });

    it('should return success true when payload return id', () => {
        const payload = [{
            id:'thread-123'
        }]

        const result = new VerifiedThread(payload)
        expect(result.success).toMatch('true')
    })
})