import { IsAlphanumeric, IsDateString, IsInt, IsNumber } from 'class-validator';

export class CreateSeriesDto {
  @IsAlphanumeric()
  title: string;
  @IsAlphanumeric()
  description?: string;
  @IsDateString()
  releaseDate: Date;
  @IsAlphanumeric()
  creator: string;
  genres: string[];
  @IsInt()
  seasons: number;
  @IsInt()
  episodes: number;
  @IsNumber()
  rating: number;
  @IsInt()
  runtimeMinutes: number;
}
