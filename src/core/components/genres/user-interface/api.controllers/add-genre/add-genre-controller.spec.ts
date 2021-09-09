import { AddGenreController } from './add-genre-controller'

type SutTypes = {
  sut: AddGenreController 
}

const makeSut = (): SutTypes => {  
  const sut = new AddGenreController()
  return {
    sut
  }
}

describe('Add Genre', () => {
  
})
