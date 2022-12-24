const CreatedReply = require('../CreatedReply');

describe('a CreatedReply entities', () => {
    it('should throw error when data did not match required field', () => {
        // Arrange
        const payload = {
          id: 'reply-123',
          content: 'sebuah balasan',
        };
    
        // Action and Assert
        expect(() => new CreatedReply(payload)).toThrowError('CREATED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: 'sebuah balasan',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action and Assert
    expect(() => new CreatedReply(payload)).toThrowError('CREATED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create CreatedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      content: 'sebuah balasan',
      owner: 'user-123',
    };

    // Action
    const created_reply = new CreatedReply(payload);

    // Assert
    expect(created_reply.id).toEqual(payload.id);
    expect(created_reply.content).toEqual(payload.content);
    expect(created_reply.owner).toEqual(payload.owner);
  });
});