import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService {
  constructor(private readonly configService: ConfigService) {}
}
