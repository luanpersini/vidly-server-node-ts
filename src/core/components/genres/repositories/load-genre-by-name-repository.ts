import { GenreModel } from '../domain/genre';

export interface LoadGenreByNameRepository {
  loadByName: (name: string) => Promise<GenreModel>
}
