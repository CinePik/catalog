import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { PrismaService } from 'src/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
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
