export class CreateSeriesDto {
  title: string;
  description?: string;
  releaseDate: Date;
  creator: string;
  genres: string[];
  seasons: number;
  episodes: number;
  rating: number;
  runtimeMinutes: number;
}
