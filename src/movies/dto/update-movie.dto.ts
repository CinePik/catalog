import { IsAlphanumeric, IsDateString, IsNumber } from 'class-validator';

export class UpdateMovieDto {
  @IsAlphanumeric()
  title?: string;
  @IsAlphanumeric()
  description?: string;
  @IsDateString()
  releaseDate?: Date;
  @IsAlphanumeric()
  director?: string;
  genres?: string[];
  @IsNumber()
  rating?: number;
  @IsNumber()
  runtimeMinutes?: number;
}
