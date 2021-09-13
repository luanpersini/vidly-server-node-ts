import { GenreModel } from '../domain/genre'
import { GenreRepository } from '../repositories/genre-repository'
import { mockGenre } from '.'

export const mockGenreRepository = (): GenreRepository => {
  class GenreRepositoryStub implements GenreRepository {
    async add (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenre())
    }
    async loadByName (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenre())
    }
  }
  return new GenreRepositoryStub()
}