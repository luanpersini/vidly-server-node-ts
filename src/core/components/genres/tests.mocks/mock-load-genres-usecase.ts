import { GenreModel } from '../domain/genre'
import { LoadGenres } from '../usecases/load-genres/load-genres'
import { mockGenreModels } from '.'

export const mockLoadGenres = (): LoadGenres => {
  class LoadGenresStub implements LoadGenres {
    async loadAll (): Promise<GenreModel[]> {
      return Promise.resolve(mockGenreModels())
    }
  }
  return new LoadGenresStub()
}
