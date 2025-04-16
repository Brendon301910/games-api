// application/services/game.service.ts
import { Injectable } from '@nestjs/common';
import { GameRepository } from 'domain/repositories/game.repository';
import {
  SearchGameUseCase,
  ExternalGameProvider,
} from 'domain/usecases/search-game.use-case';

import { Game } from 'src/domain/entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    private readonly searchGameUseCase: SearchGameUseCase,
    private readonly gameRepository: GameRepository,
    private readonly externalGameProvider: ExternalGameProvider,
  ) {}

  // Método para buscar um jogo, seja do cache ou da API externa
  async searchGameByTitle(title: string): Promise<Game> {
    const { game } = await this.searchGameUseCase.execute({ title });
    return game;
  }
}
