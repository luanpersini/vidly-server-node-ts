import * as _ from 'lodash';

import { AddGenre } from './add-genre';
import { GenreModel } from '../../domain/genre';
import { GenresRepository } from '@/core/components/genres/repositories/genres-repository';

export class AddGenreUsecase implements AddGenre {
  constructor (
    private readonly GenresRepository: GenresRepository    
  ) {}
  async add (name: string): Promise<GenreModel>{    
    const formatedName = _.upperFirst(name)
    const genre = await this.GenresRepository.loadByName(formatedName)
    if (!genre) {
      const newGenre = await this.GenresRepository.add(formatedName)
      return newGenre
    }
     return null
  }      
}


  
