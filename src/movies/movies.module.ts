import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [KeycloakModule, MetricsModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
