import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProviderControllers';

const providersRoute = Router();

const providersController = new ProvidersController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providersController.index);

export default providersRoute;
