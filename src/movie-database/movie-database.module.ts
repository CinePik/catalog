import { Module } from '@nestjs/common';
import { MovieDatabaseService } from './movie-database.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MovieDatabaseService],
  exports: [MovieDatabaseService],
})
export class MovieDatabaseModule {}
