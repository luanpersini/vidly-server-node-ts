import { GenreModel } from '../domain/genre'
import { GenresRepository } from '../repositories/genres-repository'
import { mockGenreModel } from '.'

export const mockGenreRepository = (): GenresRepository => {
  class GenreRepositoryStub implements GenresRepository {
    async add (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenreModel())
    }
    async loadByName (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenreModel())
    }
  }
  return new GenreRepositoryStub()
}