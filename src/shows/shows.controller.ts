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
  @ApiOkResponse({
    description: 'Shows found successfully.',
    type: [ShowResponseDto],
  })
  @ApiOperation({
    summary: 'Returns a show',
    description: 'Returns specific show with an id.',
  })
  findOne(@Param('id') id: string): Promise<any> {
    return this.seriesService.findOne(+id);
  }
}
