import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { MovieDatabaseService } from 'src/movie-database/movie-database.service';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(
    private prisma: PrismaService,
    private readonly movieDatabaseService: MovieDatabaseService,
  ) {}

  async findAll(): Promise<Movie[]> {
    // const { access_token, expires_in, refresh_token, refresh_expires_in } =
    const data = await this.movieDatabaseService
      .getRandomMovies()
      .catch((error: AxiosError) => {
        const message = error.response.data;
        const status = error.response.status;

        this.logger.warn(`Login failed with status ${status}`, message);
        throw new HttpException(message, status);
      });

    // return {
    //   access_token,
    //   refresh_token,
    //   expires_in,
    //   refresh_expires_in,
    // };
    return data;
  }

  async findOne(id: number): Promise<Movie> {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({ data: createMovieDto });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number): Promise<Movie> {
    return this.prisma.movie.delete({ where: { id } });
  }
}
