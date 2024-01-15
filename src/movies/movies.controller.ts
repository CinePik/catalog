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
import { Movie, Prisma } from '@prisma/client';
import { MovieResponseDto } from './dto/response/movie-response.dto';

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
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Movies fetched successfully.',
    type: [MovieResponseDto],
  })
  @Unprotected()
  @ApiOperation({
    summary: 'Returns all movies',
    description: 'Returns all movies in the database.',
  })
  findAll(): Promise<MovieResponseDto[]> {
    return this.moviesService.findAll();
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
    return this.moviesService.findOne(+id);
  }
}
