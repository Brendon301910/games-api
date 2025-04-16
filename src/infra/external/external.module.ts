import { Module } from '@nestjs/common';
import { RawgGameProviderService } from './rawg-game-provider.service';
import { RedisCacheService } from 'src/infra/cache/redis-cache.service';
import { CacheService } from 'src/domain/cache/cache.service';
import { GameRepository } from 'domain/repositories/game.repository';

@Module({
  providers: [
    RawgGameProviderService,
    GameRepository,
    RedisCacheService, // Cache provider
    {
      provide: CacheService,
      useClass: RedisCacheService,
    },
  ],
  exports: [RawgGameProviderService, CacheService],
})
export class ExternalModule {}
