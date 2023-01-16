const DeletedLikes = require('../deletedLikes');

describe('a DeletedLikes entities', () => {
    it('should throw error when is deleted is false', () => {
        // Arrange
        const payload = {
          id: 'likes-123',
          is_deleted:false,
        };
    
        // Action and Assert
        expect(() => new DeletedLikes(payload)).toThrowError('DELETED_LIKES.FAILED_TO_REMOVE_LIKES');
    });

  it('should throw error when payload did is missing', () => {
    // Arrange
    const payload = {
        id: 'likes-123',
    };

    // Action and Assert
    expect(() => new DeletedLikes(payload)).toThrowError('DELETED_LIKES.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
        id: 'likes-123',
        is_deleted: 2

    };

    // Action and Assert
    expect(() => new DeletedLikes(payload)).toThrowError('DELETED_LIKES.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeletedLikes object correctly', () => {
    // Arrange
    const payload = {
        id: 'likes-123',
        is_deleted:true,
    };

    // Action
    const deleted_likes = new DeletedLikes(payload);

    // Assert
    expect(deleted_likes.id).toEqual(payload.id);
    expect(deleted_likes.is_deleted).toEqual(payload.is_deleted);
  });
});