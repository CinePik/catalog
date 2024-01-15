import { Test, TestingModule } from '@nestjs/testing';
import { MovieDatabaseService } from './movie-database.service';

describe('MovieDatabaseService', () => {
  let service: MovieDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDatabaseService],
    }).compile();

    service = module.get<MovieDatabaseService>(MovieDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
