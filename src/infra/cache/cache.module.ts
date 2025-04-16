import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisCacheService } from './redis-cache.service';
import { CacheService } from 'src/domain/cache/cache.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        });
      },
    },
    {
      provide: CacheService,
      useClass: RedisCacheService,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
