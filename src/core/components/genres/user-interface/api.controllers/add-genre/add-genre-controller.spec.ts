import { HttpRequest, Validation } from '@/common/interfaces'
import { badRequest, forbidden, serverError } from '@/common/helpers/http-helper'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { AddGenreController } from './add-genre-controller'
import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { MissingParamError } from '@/common/errors'
import { mockAddGenre } from '../../../tests.mocks'
import { mockValidation } from '@/tests/mock-validation'
import { throwError } from '@/tests/test-helper'

type SutTypes = {
  sut: AddGenreController
  validationStub: Validation
  addGenreStub: AddGenre
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addGenreStub = mockAddGenre()
  const sut = new AddGenreController(validationStub, addGenreStub)
  return {
    sut,
    validationStub,
    addGenreStub
  }
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    genre: 'any_genre'
  }
})

describe('AddGenreController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('should Return **BadRequest** if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  test('should Return **Forbidden** if there is already an genre with the given name', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new GenreExistsError()))
  })
  test('should Return **Unexpected Error** if something fail while trying to create the new genre', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
