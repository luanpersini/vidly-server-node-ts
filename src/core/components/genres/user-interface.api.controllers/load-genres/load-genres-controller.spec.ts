import { HttpRequest, Validation } from '@/common/interfaces'
import { badRequest, forbidden, ok, serverError } from '@/common/helpers/http-helper'
import { mockAddGenre, mockGenreModel, mockGenreModels } from '../../tests.mocks'

import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { LoadGenres } from '../../usecases/load-genres/load-genres'
import { LoadGenresController } from './load-genres-controller'
import { mockLoadGenres } from '../../tests.mocks/mock-load-genres-usecase'
import { mockValidation } from '@/tests/mock-validation'
import { throwError } from '@/tests/test-helper'

type SutTypes = {
  sut: LoadGenresController
  loadGenresStub: LoadGenres
}

const makeSut = (): SutTypes => {
  const loadGenresStub = mockLoadGenres()
  const sut = new LoadGenresController(loadGenresStub)
  return {
    sut,
    loadGenresStub 
  }
}

describe('AddGenreController', () => { 
  test('Should call LoadSurveys', async () => {
    const { sut, loadGenresStub } = makeSut()
    const Spy = jest.spyOn(loadGenresStub, 'loadAll')
    await sut.handle({})
    expect(Spy).toHaveBeenCalled()
  })
  test('should Return **Ok** with the genres data', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockGenreModels()))
  }) 
  test('should Return **Unexpected Error** if something fails while trying to retrieve the genres', async () => {
    const { sut, loadGenresStub } = makeSut()
    jest.spyOn(loadGenresStub, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
