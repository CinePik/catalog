import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HomeContentResponseDto } from './dto/response/home-content-response.dto';
import { HomeResponseDto } from './dto/response/home-response.dto';
import { HomeSectionResponseDto } from './dto/response/home-section-response.dto';
import { SearchItemResponseDto } from './dto/response/search-item-response.dto';
import { SearchResponseDto } from './dto/response/search-response.dto';

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
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(
              `Get Home layout failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
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

  async search(query: string): Promise<SearchResponseDto> {
    this.logger.log(`Searching for ${query}`);
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://movies-api14.p.rapidapi.com/search', {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
          },
          params: {
            query: query,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(`Search failed with status ${status}`, message);
            throw new HttpException(message, status);
          }),
        ),
    );
    let contents: Array<SearchItemResponseDto> = [];
    for (const content of data.contents) {
      contents.push({
        id: content._id,
        title: content.title,
        backdrop_path: content.backdrop_path,
        genres: content.genres,
        original_title: content.original_title,
        overview: content.overview,
        poster_path: content.poster_path,
        release_date: content.release_date,
        contentType: content.contentType,
        vote_average: content.vote_average,
        vote_count: content.vote_count,
        youtube_trailer: content.youtube_trailer,
        sources: content.sources,
      });
    }
    let searchResponse = new SearchResponseDto();
    searchResponse.query = query;
    searchResponse.contents = contents;
    return searchResponse;
  }
}
