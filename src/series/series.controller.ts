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
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Unprotected, Roles } from 'nest-keycloak-connect';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  @Unprotected()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Post()
  @Roles({ roles: ['realm:app-admin'] })
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @Put(':id')
  @Roles({ roles: ['realm:app-admin'] })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesService.update(+id, updateSeriesDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'] })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seriesService.remove(+id);
  }
}
