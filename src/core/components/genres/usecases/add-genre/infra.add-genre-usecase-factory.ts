import { AddGenreUsecase } from './add-genre-usecase';
import { GenreMongoRepository } from '@genres/repositories/infra.repository-implementation/genre-mongo-repository';

export const makeAddGenreUsecase = (): AddGenreUsecase => {
  const genreRepository = new GenreMongoRepository()
  return  new AddGenreUsecase(genreRepository)
}
