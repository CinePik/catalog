import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);
  constructor(private readonly httpService: HttpService) {}

  async home(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://movies-api14.p.rapidapi.com/home', {
          headers: {
            'X-RapidAPI-Key': `b31e2640damsh04e940c2bdd1ca3p187d1cjsnb955d15c10b5`,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
