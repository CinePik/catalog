import { Controller, Get, Param } from '@nestjs/common';
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
import { ShowResponseDto } from './dto/response/all/show-response.dto';
import { ShowDetailWrapperResponseDto } from './dto/response/one/show-detail-wrapper-response.dto';

@Controller('shows')
@ApiTags('shows')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Shows found successfully.',
    type: [ShowResponseDto],
  })
  @ApiOperation({
    summary: 'Returns all shows',
    description: 'Returns all shows in the database.',
  })
  findAll(): Promise<ShowResponseDto[]> {
    return this.showsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Shows found successfully.',
    type: [ShowDetailWrapperResponseDto],
  })
  @ApiOperation({
    summary: 'Returns a show',
    description: 'Returns specific show with an id.',
  })
  findOne(@Param('id') id: string): Promise<ShowDetailWrapperResponseDto> {
    return this.showsService.findOne(+id);
  }
}
