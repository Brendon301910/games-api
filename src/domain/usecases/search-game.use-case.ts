import { Game } from '../entities/game.entity';
import { GameRepository } from '../repositories/game.repository';
import { CacheService } from '../cache/cache.service';

interface SearchGameUseCaseRequest {
  title: string;
}

interface SearchGameUseCaseResponse {
  game: Game;
}

export abstract class ExternalGameProvider {
  abstract fetchByTitle(title: string): Promise<Game>;
}

export class SearchGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly externalGameProvider: ExternalGameProvider,
    private readonly cacheService: CacheService,
  ) {}

  async execute({
    title,
  }: SearchGameUseCaseRequest): Promise<SearchGameUseCaseResponse> {
    const cacheKey = `game:${title.toLowerCase().trim()}`;

    // 1. Buscar do cache
    const cachedGame = await this.cacheService.get<Game>(cacheKey);
    if (cachedGame) {
      return { game: new Game(cachedGame) };
    }

    // 2. Buscar do banco de dados
    const storedGame = await this.gameRepository.findByTitle(title);
    if (storedGame) {
      await this.cacheService.set(cacheKey, storedGame);
      return { game: storedGame };
    }

    // 3. Buscar da API externa (RAWG)
    const externalGame = await this.externalGameProvider.fetchByTitle(title);
    await this.gameRepository.save(externalGame);
    await this.cacheService.set(cacheKey, externalGame);

    return { game: externalGame };
  }
}
