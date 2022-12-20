const CreatedComment = require('../CreatedComment');

describe('a CreatedComment entities', () => {
    it('should throw error when data did not match required field', () => {
        // Arrange
        const payload = {
          id: 'comment-123',
          content: 'sebuah comment',
        };
    
        // Action and Assert
        expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: 'sebuah comment',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action and Assert
    expect(() => new CreatedComment(payload)).toThrowError('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create createdComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      content: 'sebuah comment',
      owner: 'user-123',
    };

    // Action
    const created_comment = new CreatedComment(payload);

    // Assert
    expect(created_comment.id).toEqual(payload.id);
    expect(created_comment.content).toEqual(payload.content);
    expect(created_comment.owner).toEqual(payload.owner);
  });
});