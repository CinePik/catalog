import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDateString,
  IsInt,
  IsNumber,
  isInt,
} from 'class-validator';

export class CreateMovieDto {
  @IsAlphanumeric()
  @ApiProperty({
    description: 'Movie title.',
  })
  title: string;

  @IsAlphanumeric()
  @ApiProperty({
    description: 'Movie description.',
  })
  description?: string;

  @IsDateString()
  @ApiProperty({
    description: 'Movie release date.',
  })
  releaseDate: Date;

  @IsAlphanumeric()
  @ApiProperty({
    description: 'Movie director.',
  })
  director: string;

  @ApiProperty({
    description: 'Movie genres.',
  })
  genres: string[];

  @IsNumber()
  @ApiProperty({
    description: 'Movie rating.',
  })
  rating: number;

  @IsInt()
  @ApiProperty({
    description: 'Movie runtime in minutes.',
  })
  runtimeMinutes: number;
}
