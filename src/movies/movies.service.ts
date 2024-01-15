import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { MovieResponseDto } from './dto/response/all/movie-response.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, async } from 'rxjs';
import { HomeContentResponseDto } from 'src/common/dto/response/home-content-response.dto';
import { HomeResponseDto } from 'src/common/dto/response/home-response.dto';
import { HomeSectionResponseDto } from 'src/common/dto/response/home-section-response.dto';
import { SimilarMovieDetailResponseDto } from './dto/response/similar-movie-response.dto';
import { MovieDetailResponseDto } from './dto/response/one/movie-detail-response.dto';
import { MovieDetailWrapperResponseDto } from './dto/response/one/movie-detail-wrapper-response.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private apiKey;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('MOVIES_RAPID_API_KEY');
  }

  async findAll(): Promise<MovieResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://movies-api14.p.rapidapi.com/movies', {
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
              `Get Movies failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
          }),
        ),
    );
    let movies: Array<MovieResponseDto> = [];
    for (const movie of data.movies) {
      movies.push({
        id: movie._id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        genres: movie.genres,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
    }

    return movies;
  }

  async findOne(id: number): Promise<MovieDetailWrapperResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`https://movies-api14.p.rapidapi.com/movie/${id}`, {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(`Get movie failed with status ${status}`, message);
            throw new HttpException(message, status);
          }),
        ),
    );

    let movies: Array<MovieDetailResponseDto> = [];
    const dataMovie = data.movie;
    const movie: MovieDetailResponseDto = {
      id: dataMovie._id,
      title: dataMovie.title,
      backdrop_path: dataMovie.backdrop_path,
      genres: dataMovie.genres,
      original_title: dataMovie.original_title,
      overview: dataMovie.overview,
      poster_path: dataMovie.poster_path,
      release_date: dataMovie.release_date,
      vote_average: dataMovie.vote_average,
      vote_count: dataMovie.vote_count,
      youtube_trailer: dataMovie.youtube_trailer,
      sources: dataMovie.sources,
    };

    let similarMovies: Array<SimilarMovieDetailResponseDto> = [];

    for (const similarMovie of data.similarMovies) {
      similarMovies.push({
        id: similarMovie._id,
        title: similarMovie.title,
        backdrop_path: similarMovie.backdrop_path,
        poster_path: similarMovie.poster_path,
      });
    }

    let movieWrapper: MovieDetailWrapperResponseDto =
      new MovieDetailWrapperResponseDto();
    movieWrapper.movie = movie;
    movieWrapper.similarMovies = similarMovies;
    return movieWrapper;
  }
}
