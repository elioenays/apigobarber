import { container } from 'tsyringe';

import RedisCacheProvider from './Implementations/RedisCacheProvider';
import ICacheProvider from './Models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
