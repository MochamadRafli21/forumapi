const DeletedComment = require('../DeletedComment');

describe('a DeletedComment entities', () => {
    it('should throw error when is deleted is false', () => {
        // Arrange
        const payload = {
          id: 'comment-123',
          is_deleted:false,
        };
    
        // Action and Assert
        expect(() => new DeletedComment(payload)).toThrowError('DELETED_COMMENT.FAILED_TO_REMOVE_COMMENT');
    });

  it('should throw error when payload did is missing', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
    };

    // Action and Assert
    expect(() => new DeletedComment(payload)).toThrowError('DELETED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        is_deleted: 2

    };

    // Action and Assert
    expect(() => new DeletedComment(payload)).toThrowError('DELETED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeletedComment object correctly', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        is_deleted:true,
    };

    // Action
    const deleted_comment = new DeletedComment(payload);

    // Assert
    expect(deleted_comment.id).toEqual(payload.id);
    expect(deleted_comment.is_deleted).toEqual(payload.is_deleted);
  });
});