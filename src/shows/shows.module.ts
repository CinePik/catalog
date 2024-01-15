import { Module } from '@nestjs/common';
import { SeriesController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  controllers: [SeriesController],
  providers: [ShowsService],
})
export class ShowsModule {}
