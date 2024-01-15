import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Series } from '@prisma/client';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ShowResponseDto } from './dto/response/all/show-response.dto';
import { ShowDetailResponseDto } from './dto/response/one/show-detail-response.dto';
import { ShowDetailWrapperResponseDto } from './dto/response/one/show-detail-wrapper-response.dto';
import { SimilarShowDetailResponseDto } from './dto/response/similar-show-response.dto';
import { ShowSeasonsResponseDto } from './dto/response/one/show-season-response.dto';
import { ShowEpisodeResponseDto } from './dto/response/one/show-episode-response.dto';

@Injectable()
export class ShowsService {
  private readonly logger = new Logger(ShowsService.name);
  private apiKey;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('MOVIES_RAPID_API_KEY');
  }

  async findAll(): Promise<ShowResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://movies-api14.p.rapidapi.com/shows', {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(`Get shows failed with status ${status}`, message);
            throw new HttpException(message, status);
          }),
        ),
    );
    let shows: Array<ShowResponseDto> = [];
    for (const show of data.movies) {
      shows.push({
        id: show._id,
        title: show.title,
        backdrop_path: show.backdrop_path,
        genres: show.genres,
        original_title: show.original_title,
        overview: show.overview,
        poster_path: show.poster_path,
        first_aired: show.first_aired,
      });
    }

    return shows;
  }

  async findOne(id: number): Promise<ShowDetailWrapperResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`https://movies-api14.p.rapidapi.com/show/${id}`, {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(`Get show failed with status ${status}`, message);
            throw new HttpException(message, status);
          }),
        ),
    );

    const dataShow = data.show;
    const show: ShowDetailResponseDto = {
      id: dataShow._id,
      title: dataShow.title,
      backdrop_path: dataShow.backdrop_path,
      genres: dataShow.genres,
      original_title: dataShow.original_title,
      overview: dataShow.overview,
      poster_path: dataShow.poster_path,
      first_aired: dataShow.first_aired,
      vote_average: dataShow.vote_average,
      vote_count: dataShow.vote_count,
      youtube_trailer: dataShow.youtube_trailer,
      sources: dataShow.sources,
    };

    let seasons: Array<ShowSeasonsResponseDto> = [];

    for (const season of data.seasons) {
      const dataEpisodes = season.episodes;
      let episodes: Array<ShowEpisodeResponseDto> = [];
      for (const episode of dataEpisodes) {
        episodes.push({
          id: episode._id,
          episode_number: episode.episode_number,
          first_aired: episode.first_aired,
          season_number: episode.season_number,
          show_id: episode.show_id,
          sources: episode.sources,
          thumbnail_path: episode.thumbnail_path,
          title: episode.title,
          availability: episode.availability,
        });
      }
      seasons.push({
        season: season.season,
        episodes: episodes,
      });
    }

    let showWrapper: ShowDetailWrapperResponseDto =
      new ShowDetailWrapperResponseDto();
    showWrapper.show = show;
    showWrapper.seasons = seasons;
    return showWrapper;
  }
}
