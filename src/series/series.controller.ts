import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/request/create-series.dto';
import { UpdateSeriesDto } from './dto/request/update-series.dto';
import { Unprotected, Roles } from 'nest-keycloak-connect';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Series } from '@prisma/client';
import { MovieResponseDto } from 'src/movies/dto/response/movie-response.dto';
import { SeriesResponseDto } from './dto/response/series-response.dto';
import { MetricsService } from 'src/metrics/metrics.service';

@Controller('series')
@ApiTags('series')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiUnauthorizedResponse({
  description: 'User not authorized correctly.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private metricsService: MetricsService,
  ) {}

  @Get()
  @Unprotected()
  @ApiOkResponse({
    description: 'Series found successfully.',
    type: [SeriesResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all series',
    description: 'Returns all series in the database.',
  })
  findAll(): Promise<Series[]> {
    return this.metricsService.handleRequest(() =>
      this.seriesService.findAll(),
    );
  }

  @Get(':id')
  @Unprotected()
  @ApiOkResponse({
    description: 'Series found successfully.',
    type: [SeriesResponseDto],
  })
  @ApiOperation({
    summary: 'Returns a series',
    description: 'Returns specific series with an id.',
  })
  findOne(@Param('id') id: string): Promise<Series> {
    return this.metricsService.handleRequest(() =>
      this.seriesService.findOne(+id),
    );
  }

  @Post()
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Series create successfully.',
    type: MovieResponseDto,
  })
  @ApiOperation({
    summary: 'Creates a new series',
    description: 'Admins can create a new series.',
  })
  create(@Body() createSeriesDto: CreateSeriesDto): Promise<Series> {
    return this.metricsService.handleRequest(() =>
      this.seriesService.create(createSeriesDto),
    );
  }

  @Put(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Series updated successfully.',
    type: MovieResponseDto,
  })
  @ApiOperation({
    summary: 'Updates a series',
    description: 'Admins can update a series with an id.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ): Promise<Series> {
    return this.metricsService.handleRequest(() =>
      this.seriesService.update(+id, updateSeriesDto),
    );
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Series deleted successfully.',
    type: MovieResponseDto,
  })
  @ApiOperation({
    summary: 'Deletes a series',
    description: 'Admins can delete a series with an id.',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Series> {
    return this.metricsService.handleRequest(() =>
      this.seriesService.remove(+id),
    );
  }
}
