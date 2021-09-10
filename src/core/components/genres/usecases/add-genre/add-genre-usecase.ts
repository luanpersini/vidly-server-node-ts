import { AddGenre, AddGenreParams } from './add-genre';

import { AddGenreRepository } from '../../repositories/add-genre-repository';
import { GenreModel } from '../../domain/genre';
import { LoadGenreByNameRepository } from '../../repositories/load-genre-by-name-repository';

export class AdGenreUSecase implements AddGenre {
  constructor (
    private readonly addGenreRepository: AddGenreRepository,
    private readonly loadGenreByNameRepository: LoadGenreByNameRepository
  ) {}
  async add (name: string): Promise<GenreModel>{    
    const genre = await this.loadGenreByNameRepository.loadByName(name)
    if (!genre) {
      const newGenre = await this.addGenreRepository.add(name)
      return newGenre
    }
    return null
  }      
}


  
