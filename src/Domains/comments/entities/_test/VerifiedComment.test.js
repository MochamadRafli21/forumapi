const VerifiedComment = require('../VerifiedComment');

describe('a VerifiedComment entities', () => {
    it('should throw error when data did not match required field', () => {
        // Arrange
        const payload = {
          id: '',
          owner:'',
          payload_owner:'user-123'
        };
    
        // Action and Assert
        expect(() => new VerifiedComment(payload)).toThrowError('VERIFIED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner:123,
      payload_owner:'user-123'
    };

    // Action and Assert
    expect(() => new VerifiedComment(payload)).toThrowError('VERIFIED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload did not meet stored data', () => {
    // Arrange
    const payload = {
      id:'comment-123',
      owner:'user-223',
      payload_owner:'user-123'
    };

    // Action and Assert
    expect(() => new VerifiedComment(payload)).toThrowError('VERIFIED_COMMENT.OWNER_NOT_MATCH');
  });

  it('should create Verified object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner:'user-123',
      payload_owner:'user-123'
    };

    // Action
    const comment_status = new VerifiedComment(payload);

    // Assert
    expect(comment_status.status).toEqual('success');
  });
});