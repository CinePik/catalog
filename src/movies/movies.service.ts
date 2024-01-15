import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { MovieResponseDto } from './dto/response/movie-response.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, async } from 'rxjs';
import { HomeContentResponseDto } from 'src/common/dto/response/home-content-response.dto';
import { HomeResponseDto } from 'src/common/dto/response/home-response.dto';
import { HomeSectionResponseDto } from 'src/common/dto/response/home-section-response.dto';

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
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    let movies: Array<MovieResponseDto> = [];
    for (const movie of data.movies) {
      movies.push({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        genres: movie.genres,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        contentType: movie.contentType,
      });
    }

    return movies;
  }

  async findOne(id: number): Promise<any> {
    // return this.prisma.movie.findUnique({ where: { id } });
  }
}
