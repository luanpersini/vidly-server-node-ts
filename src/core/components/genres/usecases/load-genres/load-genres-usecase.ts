import { GenreModel } from '../../domain/genre'
import { GenresRepository } from '@/core/components/genres/repositories/genres-repository'
import { LoadGenres } from './load-genres'

export class LoadGenresUsecase implements LoadGenres {
  constructor(private readonly GenresRepository: GenresRepository) {}
  async loadAll(): Promise<GenreModel[]> {
    const genres = await this.GenresRepository.loadAll()
    if (!genres) {
       return []
    }
    return genres    
  }
}
