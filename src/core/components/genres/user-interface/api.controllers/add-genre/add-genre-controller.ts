import { Controller, HttpRequest, HttpResponse, Validation } from '@/common/interfaces'
import { badRequest, forbidden, ok, serverError } from '@/common/helpers/http-helper'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { GenreExistsError } from '@/common/errors/genre-exists-error'

export class AddGenreController implements Controller {
  constructor(
    private readonly validation: Validation, 
    private readonly addGenre: AddGenre
    ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const errorsFound = this.validation.validate(httpRequest.body)
      if (errorsFound) {
        return badRequest(errorsFound)
      }
      const { name } = httpRequest.body
      const genre = await this.addGenre.add( name )
      if (!genre) {
        return forbidden(new GenreExistsError())
      }
      return ok(genre)
    } catch (error) {
      return serverError(error)
    }
  }
}
