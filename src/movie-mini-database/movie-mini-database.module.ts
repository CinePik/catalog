import { Module } from '@nestjs/common';
import { MovieMiniDatabaseService } from './movie-mini-database.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MovieMiniDatabaseService],
  exports: [MovieMiniDatabaseService],
})
export class MovieMiniDatabaseModule {}
