import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MetricsModule } from 'src/metrics/metrics.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [HttpModule, MetricsModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
