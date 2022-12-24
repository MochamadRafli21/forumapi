const VerifiedReply = require('../VerifiedReply');

describe('a VerifiedReply entities', () => {
    it('should throw error when no reply found', () => {
        // Arrange
        const payload = {
          id: '',
          owner:'',
          payload_owner:'user-123'
        };
    
        // Action and Assert
        expect(() => new VerifiedReply(payload)).toThrowError('VERIFIED_REPLY.NOT_FOUND_REPLY');
    });

  it('should throw error when data missing', () => {
      // Arrange
      const payload = {
        id: 'reply-123',
        owner:'user-123',
        payload_owner:''
      };
  
      // Action and Assert
      expect(() => new VerifiedReply(payload)).toThrowError('VERIFIED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner:123,
      payload_owner:'user-123'
    };

    // Action and Assert
    expect(() => new VerifiedReply(payload)).toThrowError('VERIFIED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload did not meet stored data', () => {
    // Arrange
    const payload = {
      id:'comment-123',
      owner:'user-223',
      payload_owner:'user-123'
    };

    // Action and Assert
    expect(() => new VerifiedReply(payload)).toThrowError('VERIFIED_REPLY.OWNER_NOT_MATCH');
  });

  it('should create Verified object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner:'user-123',
      payload_owner:'user-123'
    };

    // Action
    const reply_status = new VerifiedReply(payload);

    // Assert
    expect(reply_status.status).toEqual('success');
  });
});