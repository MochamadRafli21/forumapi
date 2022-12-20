const RetrivedThread = require('../RetrivedThread')

describe('a RetrivedThread entities', () => {

    it('should throw error when payload did not fill required tags', () => {
        expect(() => new RetrivedThread({})).toThrowError('RETRIEVED_THREAD.NOT_FOUND');
    });
})