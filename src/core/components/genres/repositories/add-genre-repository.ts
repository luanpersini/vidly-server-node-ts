import { AddGenreParams } from '../usecases/add-genre/add-genre'
import { GenreModel } from '../domain/genre';

export interface AddGenreRepository {
  add: (name: string) => Promise<GenreModel>
}
