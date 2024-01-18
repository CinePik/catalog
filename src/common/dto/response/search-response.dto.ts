import { ApiProperty } from '@nestjs/swagger';
import { SearchItemResponseDto } from './search-item-response.dto';

export class SearchResponseDto {
  @ApiProperty({
    description: 'Search query.',
  })
  query: string;
  @ApiProperty({
    description: 'Search results.',
  })
  contents: SearchItemResponseDto[];
}
