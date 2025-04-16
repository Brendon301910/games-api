import { IsOptional, IsString } from 'class-validator';

export class ListGamesDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  platform?: string;
}
