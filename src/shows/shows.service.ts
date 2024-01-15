import { Injectable } from '@nestjs/common';

import { Series } from '@prisma/client';

@Injectable()
export class ShowsService {
  constructor() {}

  async findAll(): Promise<any> {
    // return this.prisma.shows.findMany();
  }

  async findOne(id: number): Promise<any> {
    // return this.prisma.shows.findUnique({ where: { id } });
  }
}
