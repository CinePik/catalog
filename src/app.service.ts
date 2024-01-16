import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor() {}
  info(): string {
    return 'CinePik catalog v' + process.env.npm_package_version;
  }
}
