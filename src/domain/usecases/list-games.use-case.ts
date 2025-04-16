import { Game } from '../entities/game.entity';
import { GameRepository } from '../repositories/game.repository';

interface ListGamesUseCaseRequest {
  title?: string;
  platform?: string;
}

interface ListGamesUseCaseResponse {
  games: Game[];
}

export class ListGamesUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute({
    title,
    platform,
  }: ListGamesUseCaseRequest): Promise<ListGamesUseCaseResponse> {
    const games = await this.gameRepository.findAll({ title, platform });
    return { games };
  }
}
