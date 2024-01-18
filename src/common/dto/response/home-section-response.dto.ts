import { ApiProperty } from '@nestjs/swagger';
import { HomeContentResponseDto } from './home-content-response.dto';

export class HomeSectionResponseDto {
  @ApiProperty({
    description: 'Section title.',
  })
  title: string;
  @ApiProperty({
    description: 'A list of section contents (movies and shows).',
  })
  content: HomeContentResponseDto[];
}
