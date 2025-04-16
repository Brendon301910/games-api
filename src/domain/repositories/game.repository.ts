import { Game } from 'domain/entities/game.entity';

export abstract class GameRepository {
  abstract findByTitle(title: string): Promise<Game | null>;
  abstract findAll(filters?: {
    title?: string;
    platform?: string;
  }): Promise<Game[]>;
  abstract save(game: Game): Promise<void>;
}
