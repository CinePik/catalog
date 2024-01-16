import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MetricsService } from 'src/metrics/metrics.service';
import { CommonService } from './common.service';
import { HomeResponseDto } from './dto/response/home-response.dto';
import { SearchResponseDto } from './dto/response/search-response.dto';

@Controller('common')
@ApiTags('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private metricsService: MetricsService,
  ) {}

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
    return this.metricsService.handleRequest(() => this.commonService.home());
  }

  @Get('search')
  @ApiResponse({
    description: 'Got search results successfully.',
    type: [SearchResponseDto],
  })
  @ApiOperation({
    summary: 'Search',
    description:
      'The Search endpoint empowers users to conduct customized searches, enabling them to discover movies and TV shows based on specific criteria such as genre, actor, director, or keyword, providing a tailored and efficient content discovery experience.',
  })
  @ApiInternalServerErrorResponse({
    description: 'There was an error processing this request.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  search(@Query('query') query: string): Promise<SearchResponseDto> {
    return this.metricsService.handleRequest(() =>
      this.commonService.search(query),
    );
  }
}
