import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateuserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateuserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '213465',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@teste.com',
      password: '213465',
    });

    expect(response).toHaveProperty('token');
  });
});
