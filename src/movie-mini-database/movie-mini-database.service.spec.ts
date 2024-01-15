import { Test, TestingModule } from '@nestjs/testing';
import { MovieMiniDatabaseService } from './movie-mini-database.service';

describe('MovieMiniDatabaseService', () => {
  let service: MovieMiniDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieMiniDatabaseService],
    }).compile();

    service = module.get<MovieMiniDatabaseService>(MovieMiniDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
