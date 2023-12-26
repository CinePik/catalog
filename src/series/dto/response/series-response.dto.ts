import { ApiProperty } from '@nestjs/swagger';
import { Movie, Series } from '@prisma/client';

export class SeriesResponseDto implements Series {
  @ApiProperty({
    description: 'Series identifier.',
  })
  id: number;

  @ApiProperty({
    description: 'Series title.',
  })
  title: string;

  @ApiProperty({
    description: 'Series description. ',
  })
  description: string;

  @ApiProperty({
    description: 'Series release date.',
  })
  releaseDate: Date;

  @ApiProperty({
    description: 'Series creator',
  })
  creator: string;

  @ApiProperty({
    description: 'Series genres.',
  })
  genres: string[];

  @ApiProperty({
    description: 'Series rating.',
  })
  rating: number;

  @ApiProperty({
    description: 'Series runtime in minutes.',
  })
  runtimeMinutes: number;

  @ApiProperty({
    description: 'Series creation date.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Series update date.',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Number of seasons.',
  })
  seasons: number;

  @ApiProperty({
    description: 'Number of episodes.',
  })
  episodes: number;
}
