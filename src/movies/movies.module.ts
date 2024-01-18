import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MetricsModule } from 'src/metrics/metrics.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [HttpModule, MetricsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
