import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { MovieDatabaseService } from 'src/movie-database/movie-database.service';
import { HttpModule } from '@nestjs/axios';
import { MovieDatabaseModule } from 'src/movie-database/movie-database.module';

@Module({
  imports: [HttpModule, KeycloakModule, MovieDatabaseModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
