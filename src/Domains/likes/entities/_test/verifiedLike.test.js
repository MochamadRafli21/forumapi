const verifiedLike = require('../verifiedLike');

describe('a verifiedLike entities', () => {
    it('should throw error when no like found', () => {
        // Arrange
        const payload = {
          comment:'',
          owner:'user-123',
        };
    
        // Action and Assert
        const like_status = new verifiedLike(payload);

        expect(like_status.is_exist).toEqual(false);

    });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
        comment: 123,
        owner:'user-123',
    };

    // Action and Assert
    expect(() => new verifiedLike(payload)).toThrowError('VERIFIED_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Verified object correctly', () => {
    // Arrange
    const payload = {
      comment: 'comment-123',
      owner:'user-123',
    };

    // Action
    const like_status = new verifiedLike(payload);

    // Assert
    expect(like_status.is_exist).toEqual(true);
  });
});