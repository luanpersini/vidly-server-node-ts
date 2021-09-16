import { AddGenreUsecase } from './add-genre-usecase';
import { GenreMongoRepository } from '@/core/components/genres/repositories/infra.genres-mongo-repository';

export const makeAddGenreUsecase = (): AddGenreUsecase => {
  const genreRepository = new GenreMongoRepository()
  return  new AddGenreUsecase(genreRepository)
}
