import { Injectable } from '@nestjs/common';
import { ListGamesDto } from '../dto/list-games.dto';
import { Game } from '../../domain/entities/game.entity';
import { ListGamesUseCase } from 'domain/usecases/list-games.use-case';

@Injectable()
export class ListGamesService {
  constructor(private readonly listGamesUseCase: ListGamesUseCase) {}

  async execute(listGamesDto: ListGamesDto): Promise<Game[]> {
    const { title, platform } = listGamesDto;
    const response = await this.listGamesUseCase.execute({ title, platform });
    return response.games;
  }
}
