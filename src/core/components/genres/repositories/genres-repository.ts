import { GenreModel } from '../domain/genre';

export interface GenresRepository {
  add: (name: string) => Promise<GenreModel>
  loadAll: () => Promise<GenreModel[]>
  loadByName: (name: string) => Promise<GenreModel>
}
