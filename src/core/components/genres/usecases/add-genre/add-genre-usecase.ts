import { AddGenre, AddGenreParams } from './add-genre';

import { GenreModel } from '../../domain/genre';
import { GenreRepository } from '@genres/repositories/genre-repository';

export class AddGenreUsecase implements AddGenre {
  constructor (
    private readonly GenreRepository: GenreRepository    
  ) {}
  async add (name: string): Promise<GenreModel>{    
    const genre = await this.GenreRepository.loadByName(name)
    if (!genre) {
      const newGenre = await this.GenreRepository.add(name)
      return newGenre
    }
     return null
  }      
}


  
