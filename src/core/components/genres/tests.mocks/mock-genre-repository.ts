import { mockGenreModel, mockGenreModels } from '.'

import { GenreModel } from '../domain/genre'
import { GenresRepository } from '../repositories/genres-repository'

export const mockGenreRepository = (): GenresRepository => {
  class GenreRepositoryStub implements GenresRepository {
    async add (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenreModel())
    }
    async loadAll (): Promise<GenreModel[]> {
      return Promise.resolve(mockGenreModels())
    }
    async loadByName (name: string): Promise<GenreModel> {
      return Promise.resolve(mockGenreModel())
    }
  }
  return new GenreRepositoryStub()
}