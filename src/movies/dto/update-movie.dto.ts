export class UpdateMovieDto {
  title?: string;
  description?: string;
  releaseDate?: Date;
  director?: string;
  genres?: string[];
  rating?: number;
  runtimeMinutes?: number;
}
