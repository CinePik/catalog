import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { HomeResponseDto } from './dto/response/home-response.dto';
import { HomeSectionResponseDto } from './dto/response/home-section-response.dto';
import { HomeContentResponseDto } from './dto/response/home-content-response.dto';

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

  async home(): Promise<HomeResponseDto> {
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
    let homeSections: Array<HomeSectionResponseDto> = [];
    for (const section of data) {
      let sectionContent: Array<HomeContentResponseDto> = [];

      for (const content of section.movies) {
        sectionContent.push({
          id: content._id,
          title: content.title,
          backdrop_path: content.backdrop_path,
          genres: content.genres,
          original_title: content.original_title,
          overview: content.overview,
          poster_path: content.poster_path,
          release_date: content.release_date,
          contentType: content.contentType,
        });
      }

      homeSections.push({
        title: section.title,
        content: sectionContent,
      });
    }
    let homeResponse = new HomeResponseDto();
    homeResponse.sections = homeSections;
    return homeResponse;
  }
}
