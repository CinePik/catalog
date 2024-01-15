import { ApiProperty } from '@nestjs/swagger';
import { MoviePlatformResponseDto } from './movie-platform-response.dto';

export class MovieSourceResponseDto {
  @ApiProperty({
    description: 'Source name.',
  })
  source: string;
  @ApiProperty({
    description: 'Source content link.',
  })
  link: string;
  @ApiProperty({
    description: 'Source type.',
  })
  type: string;
  @ApiProperty({
    description: 'Source name to be displayed.',
  })
  display_name: string;
  @ApiProperty({
    description: 'Source info url.',
  })
  info: string;
  @ApiProperty({
    description: 'Source logo url.',
  })
  logo_url: string;
  @ApiProperty({
    description: 'Source platforms.',
  })
  platform: MoviePlatformResponseDto[];
}
