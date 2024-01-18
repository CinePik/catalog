import { ApiProperty } from '@nestjs/swagger';

export class HomeContentResponseDto {
  @ApiProperty({
    description: 'Content identifier.',
  })
  id: number;
  @ApiProperty({
    description: 'Url for the backdrop image.',
  })
  backdrop_path: string;
  @ApiProperty({
    description: 'List of genres that best describe the content.',
  })
  genres: string[];
  @ApiProperty({
    description: 'Title in the original language.',
  })
  original_title: string;
  @ApiProperty({
    description: 'Short content description.',
  })
  overview: string;
  @ApiProperty({
    description: 'Url for the poster image.',
  })
  poster_path: string;
  @ApiProperty({
    description: 'Content release date.',
  })
  release_date?: Date;
  @ApiProperty({
    description: 'Content title.',
  })
  title: string;
  @ApiProperty({
    description: 'Content type (movie or show).',
  })
  contentType: string;
}
