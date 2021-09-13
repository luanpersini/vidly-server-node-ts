import { GenreModel } from '../domain/genre';

export interface GenreRepository {
  add: (name: string) => Promise<GenreModel>
  loadByName: (name: string) => Promise<GenreModel>
}
