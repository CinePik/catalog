import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, KeycloakModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
