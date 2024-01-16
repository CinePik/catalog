import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MetricsService } from 'src/metrics/metrics.service';
import { ShowResponseDto } from './dto/response/all/show-response.dto';
import { ShowDetailWrapperResponseDto } from './dto/response/one/show-detail-wrapper-response.dto';
import { ShowsService } from './shows.service';

@Controller('shows')
@ApiTags('shows')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class ShowsController {
  constructor(
    private readonly showsService: ShowsService,
    private metricsService: MetricsService,
  ) {}

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
    return this.metricsService.handleRequest(() => this.showsService.findAll());
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
    return this.metricsService.handleRequest(() =>
      this.showsService.findOne(+id),
    );
  }
}
