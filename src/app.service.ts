import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  info(): string {
    return 'CinePik catalog v' + process.env.npm_package_version;
  }
}
