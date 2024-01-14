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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { Unprotected, Roles } from 'nest-keycloak-connect';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Movie } from '@prisma/client';
import { MovieResponseDto } from './dto/response/movie-response.dto';
import { MetricsService } from 'src/metrics/metrics.service';

@Controller('movies')
@ApiTags('movies')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiUnauthorizedResponse({
  description: 'User not authorized correctly.',
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
    description: 'Movies found successfully.',
    type: [MovieResponseDto],
  })
  @Unprotected()
  @ApiOperation({
    summary: 'Returns all movies',
    description: 'Returns all movies in the database.',
  })
  findAll(): Promise<Movie[]> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.findAll(),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Movie found successfully.',
    type: MovieResponseDto,
  })
  @Unprotected()
  @ApiOperation({
    summary: 'Returns a movie',
    description: 'Returns a specific movie with an id.',
  })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.findOne(+id),
    );
  }

  @Post()
  @Roles({ roles: ['realm:app-admin'] })
  @ApiCreatedResponse({
    description: 'Movie create successfully.',
    type: MovieResponseDto,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Creates a new movie',
    description: 'Admins can create a new movie.',
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.create(createMovieDto),
    );
  }

  @Put(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiOkResponse({
    description: 'Movie updated successfully.',
    type: MovieResponseDto,
  })
  @ApiOperation({
    summary: 'Updates a movie',
    description: 'Admins can update a movie with an id.',
  })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.update(+id, updateMovieDto),
    );
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiOkResponse({
    description: 'Movie deleted successfully.',
    type: MovieResponseDto,
  })
  @ApiOperation({
    summary: 'Deletes a movie',
    description: 'Admins can delete a movie with an id.',
  })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.metricsService.handleRequest(() =>
      this.moviesService.remove(+id),
    );
  }
}
