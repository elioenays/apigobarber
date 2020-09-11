import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateuserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

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

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		try {
			const updateUserAvatar = new UpdateUserAvatarService();

			const user = await updateUserAvatar.execute({
				user_id: request.user.id,
				avatarFilename: request.file.filename,
			});

			delete user.password;

			return response.json(user);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	},
);

export default usersRouter;
