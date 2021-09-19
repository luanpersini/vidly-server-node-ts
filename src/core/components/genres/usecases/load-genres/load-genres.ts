import { GenreModel } from '../../domain/genre';

export interface LoadGenres {
  loadAll: () => Promise<GenreModel[]>
}
