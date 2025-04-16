import { CacheService } from 'src/domain/cache/cache.service';
import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService implements CacheService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttlInSeconds = 3600): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
