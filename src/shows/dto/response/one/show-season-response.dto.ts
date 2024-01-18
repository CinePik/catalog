import { ApiProperty } from '@nestjs/swagger';
import { ShowDetailResponseDto } from './show-detail-response.dto';
import { SimilarShowDetailResponseDto } from '../similar-show-response.dto';
import { ShowEpisodeResponseDto } from './show-episode-response.dto';

export class ShowSeasonsResponseDto {
  @ApiProperty({
    description: 'Season number.',
  })
  season: number;
  @ApiProperty({
    description: 'Season episodes.',
  })
  episodes: ShowEpisodeResponseDto[];
}
