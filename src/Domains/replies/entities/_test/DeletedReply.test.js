const DeletedReply = require('../DeletedReply');

describe('a DeletedReply entities', () => {
    it('should throw error when is deleted is false', () => {
        // Arrange
        const payload = {
          id: 'comment-123',
          is_deleted:false,
        };
    
        // Action and Assert
        expect(() => new DeletedReply(payload)).toThrowError('DELETED_REPLY.FAILED_TO_REMOVE_REPLY');
    });

  it('should throw error when payload did is missing', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
    };

    // Action and Assert
    expect(() => new DeletedReply(payload)).toThrowError('DELETED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        is_deleted: 2

    };

    // Action and Assert
    expect(() => new DeletedReply(payload)).toThrowError('DELETED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeletedComment object correctly', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        is_deleted:true,
    };

    // Action
    const deleted_comment = new DeletedReply(payload);

    // Assert
    expect(deleted_comment.id).toEqual(payload.id);
    expect(deleted_comment.is_deleted).toEqual(payload.is_deleted);
  });
});