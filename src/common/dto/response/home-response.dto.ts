import { ApiProperty } from '@nestjs/swagger';
import { HomeSectionResponseDto } from './home-section-response.dto';

export class HomeResponseDto {
  @ApiProperty({
    description: 'A list of content sections.',
  })
  sections: HomeSectionResponseDto[];
}
