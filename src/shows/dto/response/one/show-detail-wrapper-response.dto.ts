import { ApiProperty } from '@nestjs/swagger';
import { ShowDetailResponseDto } from './show-detail-response.dto';
import { SimilarShowDetailResponseDto } from '../similar-show-response.dto';
import { ShowSeasonsResponseDto } from './show-season-response.dto';

export class ShowDetailWrapperResponseDto {
  @ApiProperty({
    description: 'Detailed show information.',
  })
  show: ShowDetailResponseDto;
  @ApiProperty({
    description: 'Show seasons.',
  })
  seasons: ShowSeasonsResponseDto[];
}
