import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { ShowsModule } from './shows/shows.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { HealthModule } from './health/health.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    KeycloakModule,
    MoviesModule,
    ShowsModule,
    HealthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
