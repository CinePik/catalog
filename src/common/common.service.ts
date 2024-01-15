import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);
  private apiKey;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('MOVIES_RAPID_API_KEY');
  }

  async home(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://movies-api14.p.rapidapi.com/home', {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
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
