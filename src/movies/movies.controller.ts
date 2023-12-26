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
    description: 'Movies found successfully.',
    type: Promise<[Movie]>,
  })
  @Unprotected()
  @ApiOperation({
    summary: 'Returns all movies',
    description: 'Returns all movies in the datable.',
  })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Movie found successfully.',
  })
  @Unprotected()
  @ApiOperation({
    summary: 'Returns a movie',
    description: 'Returns a specific movie with an id.',
  })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @Post()
  @Roles({ roles: ['realm:app-admin'] })
  @ApiCreatedResponse({
    description: 'Movie create successfully.',
    type: Promise<Movie>,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Admins can create a new movie.',
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiOkResponse({
    description: 'Movie updated successfully.',
  })
  @ApiOperation({
    summary: 'Update a movie',
    description: 'Admins can update a movie with an id.',
  })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'] })
  @ApiOkResponse({
    description: 'Movie deleted successfully.',
    type: Promise<Movie>,
  })
  @ApiOperation({
    summary: 'Delete a movie',
    description: 'Admins can delete a movie with an id.',
  })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.remove(+id);
  }
}
