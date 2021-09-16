import { AddGenre, AddGenreParams } from './add-genre';

import { GenreModel } from '../../domain/genre';
import { GenresRepository } from '@/core/components/genres/repositories/genres-repository';

export class AddGenreUsecase implements AddGenre {
  constructor (
    private readonly GenresRepository: GenresRepository    
  ) {}
  async add (name: string): Promise<GenreModel>{    
    const genre = await this.GenresRepository.loadByName(name)
    if (!genre) {
      const newGenre = await this.GenresRepository.add(name)
      return newGenre
    }
     return null
  }      
}


  
