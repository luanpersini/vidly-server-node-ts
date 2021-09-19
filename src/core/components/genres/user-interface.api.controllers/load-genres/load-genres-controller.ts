import { Controller, HttpRequest, HttpResponse, Validation } from '@/common/interfaces'
import { ok, serverError } from '@/common/helpers/http-helper'

import { LoadGenres } from '../../usecases/load-genres/load-genres'

export class LoadGenresController implements Controller {
  constructor(    
    private readonly loadGenres: LoadGenres,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {  
      const genres = await this.loadGenres.loadAll()
      return ok(genres)
    } catch (error) {
      return serverError(error)
    }
  } 
}

