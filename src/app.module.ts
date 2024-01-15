import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { HealthModule } from './health/health.module';
import { MovieDatabaseService } from './movie-database/movie-database.service';
import { MovieMiniDatabaseService } from './movie-mini-database/movie-mini-database.service';
import { MovieMiniDatabaseModule } from './movie-mini-database/movie-mini-database.module';
import { MovieDatabaseModule } from './movie-database/movie-database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    KeycloakModule,
    MoviesModule,
    SeriesModule,
    HealthModule,
    MovieMiniDatabaseModule,
    MovieDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
