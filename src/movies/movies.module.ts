import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
