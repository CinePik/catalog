import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns the Prometheus metrics',
    description: 'Returns the Prometheus metrics.',
  })
  getMetrics() {
    return this.metricsService.metrics;
  }
}
