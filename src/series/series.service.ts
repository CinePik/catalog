import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSeriesDto } from './dto/request/create-series.dto';
import { UpdateSeriesDto } from './dto/request/update-series.dto';
import { Series } from '@prisma/client';

@Injectable()
export class SeriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Series[]> {
    return this.prisma.series.findMany();
  }

  async findOne(id: number): Promise<Series> {
    return this.prisma.series.findUnique({ where: { id } });
  }

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    return this.prisma.series.create({ data: createSeriesDto });
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    return this.prisma.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  async remove(id: number): Promise<Series> {
    return this.prisma.series.delete({ where: { id } });
  }
}
