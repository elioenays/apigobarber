import cache from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../Models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover(key: string): Promise<void> {
    const data = await this.client.get(key);
  }

  public async invalidate(key: string): Promise<void>;
}
