import { HttpRequest, Validation } from '@/common/interfaces'
import { badRequest, forbidden, ok, serverError } from '@/common/helpers/http-helper'
import { mockAddGenre, mockGenre } from '../../tests.mocks'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { AddGenreController } from './add-genre-controller'
import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { MissingParamError } from '@/common/errors'
import { ValidationError } from '@/common/errors/validation-error'
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
  const validationSchema = {}
  const sut = new AddGenreController(validationStub, addGenreStub, validationSchema)
  return {
    sut,
    validationStub,
    addGenreStub
  }
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_genre'
  }
})

describe('AddGenreController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body, {})
  })
  test('should Return **BadRequest** if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce('any_error')
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new ValidationError('any_error')))
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
  test('should Return **Ok** with the created genre data', async () => {
    const { sut, addGenreStub } = makeSut()
    jest.spyOn(addGenreStub, 'add').mockReturnValueOnce(Promise.resolve(mockGenre()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockGenre()))
  })
})
