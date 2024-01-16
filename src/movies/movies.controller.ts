import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MetricsService } from 'src/metrics/metrics.service';
import { MovieResponseDto } from './dto/response/all/movie-response.dto';
import { MovieDetailWrapperResponseDto } from './dto/response/one/movie-detail-wrapper-response.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
@ApiTags('movies')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private metricsService: MetricsService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Movies fetched successfully.',
    type: [MovieResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all movies',
    description: 'Returns all movies in the database.',
  })
  findAll(): Promise<MovieResponseDto[]> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.findAll(),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Movie found successfully.',
    type: MovieDetailWrapperResponseDto,
  })
  @ApiOperation({
    summary: 'Returns a movie',
    description: 'Returns a specific movie with an id.',
  })
  findOne(@Param('id') id: string): Promise<MovieDetailWrapperResponseDto> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.findOne(+id),
    );
  }
}
