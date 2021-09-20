import { GenreMongoRepository } from '@/core/components/genres/repositories/infra.genres-mongo-repository';
import { LoadGenresUsecase } from './load-genres-usecase';

export const makeLoadGenresUsecase = (): LoadGenresUsecase => {
  const genreRepository = new GenreMongoRepository()
  return  new LoadGenresUsecase(genreRepository)
}
