import { Controller, HttpRequest, HttpResponse, Validation } from '@/common/interfaces'

import { badRequest } from '@/common/helpers/http-helper'

export class AddGenreController implements Controller {
  constructor (
    private readonly validation: Validation
    ) {}
    
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // 1. - [ ] Receive a **POST** request on route **/api/add-genre**
    // 2. - [x] **Validate** the requested data
    // 3. - [ ] **Check** if there is already an genre with the given name
    // 4. - [ ] Create the new **genre** 
    // 5. - [ ] Return **200** with the created genre data

//Exceptions
 // 1. - [ ] Return **404** if the api dosent exist
// 2. - [x] Return **400** if validation returns an error
// 3. - [ ] Return **403** if there is already an genre with the given name 
// 4. - [ ] Return **500** if something fail while trying to create the new genre

const error = this.validation.validate(httpRequest.body)
if (error) {
  return badRequest(error)
}
    return {
    statusCode: 200,
    body: httpRequest.body
  }
}

}
