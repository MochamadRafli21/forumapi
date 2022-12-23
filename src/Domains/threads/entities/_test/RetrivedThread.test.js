const RetrivedThread = require('../RetrivedThread')

describe('a RetrivedThread entities', () => {

    it('should throw error when payload is empty', () => {
        expect(() => new RetrivedThread([])).toThrowError('RETRIEVED_THREAD.NOT_FOUND');
    });
})