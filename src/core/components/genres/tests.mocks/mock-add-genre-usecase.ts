import { AddGenre, AddGenreParams } from '../usecases/add-genre/add-genre'

import { GenreModel } from '../domain/genre'
import { mockGenre } from './mock-genre-model'

export const mockAddGenre = (): AddGenre => {
  class AddGenreStub implements AddGenre {
    async add (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenre())
    }
  }
  return new AddGenreStub()
}
