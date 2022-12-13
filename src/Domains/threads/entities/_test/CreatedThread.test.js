const CreatedThread = require('../CreatedThread');

describe('a CreatedThread entities', () => {
    it('should throw error when data did not match required field', () => {
        // Arrange
        const payload = {
          id: 'thread-123',
          title: 'sebuah thread',
        };
    
        // Action and Assert
        expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'sebuah thread',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action and Assert
    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create createdThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    };

    // Action
    created_thread = new CreatedThread(payload);

    // Assert
    expect(created_thread.id).toEqual(payload.id);
    expect(created_thread.title).toEqual(payload.title);
    expect(created_thread.owner).toEqual(payload.owner);
  });
});