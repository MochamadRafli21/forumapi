const verifiedLike = require('../verifiedLike');

describe('a verifiedLike entities', () => {
    it('should throw error when no like found', () => {
        // Arrange
        const payload = {};
    
        // Action and Assert
        const like_status = new verifiedLike(payload);

        expect(like_status.is_exist).toEqual(false);

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