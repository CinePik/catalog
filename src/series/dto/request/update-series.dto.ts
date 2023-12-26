import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDateString, IsInt, IsNumber } from 'class-validator';

export class UpdateSeriesDto {
  @IsAlphanumeric()
  @ApiProperty({
    description: 'Show title.',
  })
  title: string;

  @IsAlphanumeric()
  @ApiProperty({
    description: 'Show description.',
  })
  description?: string;

  @IsDateString()
  @ApiProperty({
    description: 'Show release date.',
  })
  releaseDate: Date;

  @IsAlphanumeric()
  @ApiProperty({
    description: 'Show creator.',
  })
  creator: string;

  genres: string[];

  @IsInt()
  @ApiProperty({
    description: 'Show season number.',
  })
  seasons: number;

  @IsInt()
  @ApiProperty({
    description: 'Show episode number.',
  })
  episodes: number;

  @IsNumber()
  @ApiProperty({
    description: 'Show rating.',
  })
  rating: number;

  @IsInt()
  @ApiProperty({
    description: 'Show runtime in minutes.',
  })
  runtimeMinutes: number;
}
