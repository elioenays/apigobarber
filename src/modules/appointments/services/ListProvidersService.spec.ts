import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'jhon doe',
      email: 'jhondoe@example.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'jhon trê',
      email: 'jhontre@example.com',
      password: '123123',
    });

    const logedUser = await fakeUsersRepository.create({
      name: 'jhon qua',
      email: 'jhonqua@example.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: logedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
