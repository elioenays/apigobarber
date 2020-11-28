import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateuserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateuserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const appointment = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '213465',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateuserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '213465',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        password: '213465',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
