const RetrivedComment = require('../RetrivedComment')

describe('a RetrivedComment entities', () => {
    it('should throw error when payload is empty', () => {
        expect(() => new RetrivedComment([])).toThrowError('RETRIEVED_COMMENT.NOT_FOUND');
    });

    it('should throw error when is_deleted true', () => {
        expect(() => new RetrivedComment([
            {
                id:'comment-123',
                is_deleted:true
            }
        ])).toThrowError('RETRIEVED_COMMENT.IS_DELETED');
    });

    it('should return retrived comment correctly', () => {
        const payload = [
            {
                id:'comment-123',
                is_deleted:false
            }
        ]
        const {id,is_deleted} = new RetrivedComment(payload)

        expect(id).toMatch(payload[0].id)
        expect(is_deleted).toBeFalsy()
    });
})