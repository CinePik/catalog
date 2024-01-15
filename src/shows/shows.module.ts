import { Module } from '@nestjs/common';
import { SeriesController } from './shows.controller';
import { ShowsService } from './shows.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';

@Module({
  imports: [KeycloakModule],
  controllers: [SeriesController],
  providers: [ShowsService],
})
export class ShowsModule {}
