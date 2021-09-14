import { Controller, HttpRequest, HttpResponse, Validation } from '@/common/interfaces'
import Joi, { ObjectSchema } from 'joi'
import { badRequest, forbidden, ok, serverError } from '@/common/helpers/http-helper'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { ValidationError } from '@/common/errors/validation-error'

export class AddGenreController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addGenre: AddGenre,
    private readonly validationSchema: ObjectSchema
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {      
      const error = this.validation.validate(httpRequest.body, this.validationSchema)     
      if (error) {
        return badRequest(new ValidationError(error))
      }
      const { name } = httpRequest.body      
      const genre = await this.addGenre.add(name)      
      if (!genre) {
        return forbidden(new GenreExistsError())
      }      
      return ok(genre)
    } catch (error) {
      return serverError(error)
    }
  }
}
