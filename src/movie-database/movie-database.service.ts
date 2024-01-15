import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieDatabaseService {
  private readonly logger = new Logger(MovieDatabaseService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getRandomMovies(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://moviesdatabase.p.rapidapi.com/titles/random`,
        {
          headers: {
            'X-RapidAPI-Key': `b31e2640damsh04e940c2bdd1ca3p187d1cjsnb955d15c10b5`,
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
          },
        },
      ),
    );

    return data;
  }
}
