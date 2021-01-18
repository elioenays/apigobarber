import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProviderController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providersRoute = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providersController.index);
providersRoute.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRoute.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRoute;
