import { GenreModel } from '../../domain/genre';

export type AddGenreParams = Omit<GenreModel, 'id'>

export interface AddGenre {
  add: (genre: AddGenreParams) => Promise<GenreModel>
}
