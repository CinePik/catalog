import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { HomeResponseDto } from './dto/response/home-response.dto';

@Controller('common')
@ApiTags('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('home')
  @ApiResponse({
    description: 'Got home page layout successfully.',
    type: [HomeResponseDto],
  })
  @ApiOperation({
    summary: 'Home',
    description:
      'The home endpoint offers a curated and dynamic homepage experience, delivering a rich selection of movies categorized to cater to diverse interests and preferences. Users can discover an array of films thoughtfully organized into genres, themes, and trending topics, ensuring they find the perfect cinematic experience tailored to their tastes.',
  })
  @ApiInternalServerErrorResponse({
    description: 'There was an error processing this request.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  home(): Promise<HomeResponseDto> {
    return this.commonService.home();
  }
}
