import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [KeycloakModule, MetricsModule],
  controllers: [SeriesController],
  providers: [SeriesService, PrismaService],
})
export class SeriesModule {}
