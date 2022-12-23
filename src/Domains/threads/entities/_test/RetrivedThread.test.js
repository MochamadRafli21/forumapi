const RetrivedThread = require('../RetrivedThread')

describe('a RetrivedThread entities', () => {

    it('should throw error when payload is empty', () => {
        expect(() => new RetrivedThread([])).toThrowError('RETRIEVED_THREAD.NOT_FOUND');
    });

    it('should show deleted coment when is_deleted = true', () => {
        // Arrange
        const payload = [{
            thread_id: 'thread-123',
            thread_title: 'new thread',
            thread_body: 'is it really that hard bro?',
            thread_date: 'datetime',
            thread_username: 'dicoding',
            is_deleted: true,
            comment_id: 'comment-123',
            date: 'datetime',
            content: 'new comment',
            owner: 'dicoding'
          }]
    
        // Action and Assert
        const {id, title, body, username ,date ,comments} = new RetrivedThread(payload)

        expect(id).toMatch(payload[0].thread_id);
        expect(title).toMatch(payload[0].thread_title);
        expect(body).toMatch(payload[0].thread_body);
        expect(username).toMatch(payload[0].thread_username);
        expect(date).toMatch(payload[0].thread_date);
        expect(comments).toHaveLength(1);
        expect(comments[0].id).toMatch(payload[0].comment_id);
        expect(comments[0].content).toMatch('**komentar telah dihapus**');
        expect(comments[0].username).toMatch(payload[0].owner);
    });

    it('should show coment body when is_deleted = false', () => {
        // Arrange
        const payload =[{
            thread_id: 'thread-123',
            thread_title: 'new thread',
            thread_body: 'is it really that hard bro?',
            thread_username: 'dicoding',
            is_deleted: false,
            thread_date: 'datetime',
            comment_id: 'comment-123',
            date: 'datetime',
            content: 'new comment',
            owner: 'dicoding'
          }];
    
        // Action and Assert
        const {id, title, body, username ,date ,comments} = new RetrivedThread(payload)

        expect(id).toMatch(payload[0].thread_id);
        expect(title).toMatch(payload[0].thread_title);
        expect(body).toMatch(payload[0].thread_body);
        expect(username).toMatch(payload[0].thread_username);
        expect(date).toMatch(payload[0].thread_date);
        expect(comments).toHaveLength(1);
        expect(comments[0].id).toMatch(payload[0].comment_id);
        expect(comments[0].content).toMatch(payload[0].content);
        expect(comments[0].username).toMatch(payload[0].owner);
    });
    
    it('should show coment empty array when cant found any comment', () => {
        // Arrange
        const payload =  [{
            thread_id: 'thread-123',
            thread_title: 'new thread',
            thread_body: 'is it really that hard bro?',
            thread_date: 'datetime',
            thread_username: 'dicoding',
            date: '',
            is_deleted: '',
            comment_id: '',
            content: '',
            owner: ''
          }];
    
        // Action and Assert
        const {id, title, body, username ,date ,comments} = new RetrivedThread(payload)

        expect(id).toMatch(payload[0].thread_id);
        expect(title).toMatch(payload[0].thread_title);
        expect(body).toMatch(payload[0].thread_body);
        expect(username).toMatch(payload[0].thread_username);
        expect(date).toMatch(payload[0].thread_date);
        expect(comments).toHaveLength(0);
    });
})