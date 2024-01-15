import { ApiProperty } from '@nestjs/swagger';

export class ShowResponseDto {
  @ApiProperty({
    description: 'Show identifier.',
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
    description: 'Short show description.',
  })
  overview: string;
  @ApiProperty({
    description: 'Url for the poster image.',
  })
  poster_path: string;
  @ApiProperty({
    description: 'Show first aired date.',
  })
  first_aired?: Date;
  @ApiProperty({
    description: 'Show title.',
  })
  title: string;
}
