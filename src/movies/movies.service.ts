import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({ data: createMovieDto });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number) {
    return this.prisma.movie.delete({ where: { id } });
  }
}
