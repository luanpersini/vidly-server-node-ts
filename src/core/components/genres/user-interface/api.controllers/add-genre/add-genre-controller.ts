import { Controller, HttpRequest, HttpResponse } from '@/common/interfaces'

export class AddGenreController implements Controller {
  constructor (
  
    ) {}
    
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
// 1. - [] Receive a **POST** request on route **/api/add-genre**
// 2. - [] **Check** if there is already an genre with the given name
// 3. - [] Create the new **genre** 
// 4. - [] Return **200** with the created genre data

    return {
    statusCode: 200,
    body: {
      answer: 'Answer 555',
      image: 'http://image-name.com'
    }
  }
}

}
