const AddedLike = require('../addedLike');

describe('a AddedLike entities', () => {
    it('should throw error when data did not match required field', () => {
        // Arrange
        const payload = {
          id: 'like-123',
        };
    
        // Action and Assert
        expect(() => new AddedLike(payload)).toThrowError('ADDED_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner:123,
      comment:123
    };

    // Action and Assert
    expect(() => new AddedLike(payload)).toThrowError('ADDED_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedLike object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      owner: 'user-123',
      comment:'comment-123',
    };

    // Action
    const created_like = new AddedLike(payload);

    // Assert
    expect(created_like.id).toEqual(payload.id);
    expect(created_like.comment).toEqual(payload.comment);
    expect(created_like.owner).toEqual(payload.owner);
  });
});