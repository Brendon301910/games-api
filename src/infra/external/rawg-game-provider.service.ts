import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExternalGameProvider } from 'domain/usecases/search-game.use-case';
import { Game } from 'src/domain/entities/game.entity';

@Injectable()
export class RawgGameProviderService implements ExternalGameProvider {
  private readonly apiUrl = 'https://api.rawg.io/api/games';

  async fetchByTitle(title: string): Promise<Game> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          key: process.env.RAWG_API_KEY, // Adicione sua chave de API RAWG aqui
          search: title,
        },
      });

      if (
        !response.data ||
        !response.data.results ||
        response.data.results.length === 0
      ) {
        throw new Error('Game not found');
      }

      const gameData = response.data.results[0]; // Pega o primeiro resultado

      return new Game({
        title: gameData.name,
        description: gameData.description_raw || 'No description available.',
        platforms: gameData.platforms.map(
          (platform: any) => platform.platform.name,
        ),
        releaseDate: new Date(gameData.released),
        rating: gameData.rating,
        coverImage: gameData.background_image,
      });
    } catch (error) {
      throw new Error(`Error fetching game from RAWG API: ${error.message}`);
    }
  }
}
