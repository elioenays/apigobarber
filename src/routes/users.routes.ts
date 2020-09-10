import { Router } from 'express';
import CreateuserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createuser = new CreateuserService();

		const user = await createuser.execute({
			name,
			email,
			password,
		});

		delete user.password;

		return response.json(user);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default usersRouter;
