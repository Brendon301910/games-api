import { Module } from '@nestjs/common';
import { ExternalModule } from 'src/infra/external/external.module';
import { CacheModule } from 'src/infra/cache/cache.module';
import { SearchGameUseCase } from 'domain/usecases/search-game.use-case';

@Module({
  imports: [ExternalModule, CacheModule],
  providers: [SearchGameUseCase],
})
export class AppModule {}
