import { Controller, HttpRequest, HttpResponse, Validation } from '@/common/interfaces'
import { badRequest, forbidden } from '@/common/helpers/http-helper'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { GenreExistsError } from '@/common/errors/genre-exists-error'

// import { AddGenre } from '@components/genres/usecases/add-genre/add-genre'

export class AddGenreController implements Controller {
  constructor(private readonly validation: Validation, private readonly addGenre: AddGenre) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    // ## Success

    // 1. - [ ] Receive a **POST** request on route **/api/add-genre**
    // 2. - [ ] **Validate** the requested data
    // 3. - [ ] **Check** if there is already an genre with the given name
    // 4. - [ ] Create the new **genre**
    // 5. - [ ] Return **Ok** with the created genre data
    // <br/>

    // ## Exceptions

    // 1. - [ ] Return **NotFound** if the api dosent exist
    // 2. - [ ] Return **BadRequest** if validation returns an error
    // 3. - [ ] Return **Forbidden** if there is already an genre with the given name
    // 4. - [ ] Return **Unexpected Error** if something fail while trying to create the new genre

    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name } = httpRequest.body
    const genre = await this.addGenre.add({ name })
    if (!genre) {
      return forbidden(new GenreExistsError())
    }
    return {
      statusCode: 200,
      body: httpRequest.body
    }
  }
}
