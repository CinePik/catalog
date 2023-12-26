import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export class MovieResponseDto implements Movie {
  @ApiProperty({
    description: 'Movie identifier.',
  })
  id: number;

  @ApiProperty({
    description: 'Movie title.',
  })
  title: string;

  @ApiProperty({
    description: 'Movie description. ',
  })
  description: string;

  @ApiProperty({
    description: 'Movie release date.',
  })
  releaseDate: Date;

  @ApiProperty({
    description: 'Movie director',
  })
  director: string;

  @ApiProperty({
    description: 'Movie genres.',
  })
  genres: string[];

  @ApiProperty({
    description: 'Movie rating.',
  })
  rating: number;

  @ApiProperty({
    description: 'Movie runtime in minutes.',
  })
  runtimeMinutes: number;

  @ApiProperty({
    description: 'Movie creation date.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Movie update date.',
  })
  updatedAt: Date;
}
