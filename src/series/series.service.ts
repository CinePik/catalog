import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.series.findMany();
  }

  async findOne(id: number) {
    return this.prisma.series.findUnique({ where: { id } });
  }

  async create(createSeriesDto: CreateSeriesDto) {
    return this.prisma.series.create({ data: createSeriesDto });
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return this.prisma.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  async remove(id: number) {
    return this.prisma.series.delete({ where: { id } });
  }
}
