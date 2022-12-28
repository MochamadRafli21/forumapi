const ThreadCreate = require('../../../Domains/threads/entities/ThreadCreate');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
 
describe('const AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner:'user-123',
      title: 'new-thread',
      body: 'secret-thread',
    };
    const expectedCreatedThread =new CreatedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });
 
    const mockThreadRepository = new ThreadRepository();
 

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(new CreatedThread({
        id: 'thread-123',
        title: 'new-thread',
        owner: 'user-123',
      })));
 
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository 
    });
 
    const createdThread = await getThreadUseCase.execute(useCasePayload);
 
    expect(createdThread).toStrictEqual(expectedCreatedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new ThreadCreate({
      body: useCasePayload.body,
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    }));
  });
});