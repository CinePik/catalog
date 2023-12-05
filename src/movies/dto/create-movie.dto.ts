import {
  IsAlphanumeric,
  IsDateString,
  IsInt,
  IsNumber,
  isInt,
} from 'class-validator';

export class CreateMovieDto {
  @IsAlphanumeric()
  title: string;
  @IsAlphanumeric()
  description?: string;
  @IsDateString()
  releaseDate: Date;
  @IsAlphanumeric()
  director: string;
  genres: string[];
  @IsNumber()
  rating: number;
  @IsInt()
  runtimeMinutes: number;
}
