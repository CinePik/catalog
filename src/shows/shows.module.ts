import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MetricsModule } from 'src/metrics/metrics.module';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [HttpModule, MetricsModule],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
