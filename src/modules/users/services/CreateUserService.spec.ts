import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateuserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateuserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateuserService(
      fakeUsersRepository,
      fakeCacheProvider,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const appointment = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '213465',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '213465',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        password: '213465',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
