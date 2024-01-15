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
import { ShowsService } from './shows.service';
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
import { MovieResponseDto } from 'src/movies/dto/response/all/movie-response.dto';
import { ShowResponseDto } from './dto/response/show-response.dto';

@Controller('shows')
@ApiTags('shows')
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
  constructor(private readonly seriesService: ShowsService) {}

  @Get()
  @Unprotected()
  @ApiOkResponse({
    description: 'Series found successfully.',
    type: [ShowResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all shows',
    description: 'Returns all shows in the database.',
  })
  findAll(): Promise<any[]> {
    return this.seriesService.findAll();
  }

  @Get(':id')
  @Unprotected()
  @ApiOkResponse({
    description: 'Series found successfully.',
    type: [ShowResponseDto],
  })
  @ApiOperation({
    summary: 'Returns a shows',
    description: 'Returns specific shows with an id.',
  })
  findOne(@Param('id') id: string): Promise<any> {
    return this.seriesService.findOne(+id);
  }
}
