import { HttpRequest, Validation } from '@/common/interfaces'
import { badRequest, forbidden, ok, serverError } from '@/common/helpers/http-helper'
import { mockAddGenre, mockGenreModel } from '../../tests.mocks'

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
  validationSchemaStub: object
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addGenreStub = mockAddGenre()
  const validationSchemaStub = {}
  const sut = new AddGenreController(validationStub, addGenreStub, validationSchemaStub)
  return {
    sut,
    validationStub,    
    validationSchemaStub,
    addGenreStub
  }
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_genre'
  }
})
const emptyRequest = (): HttpRequest => ({
  body: {    
  }
})

describe('AddGenreController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub, validationSchemaStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body, validationSchemaStub)
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
    jest.spyOn(addGenreStub, 'add').mockReturnValueOnce(Promise.resolve(mockGenreModel()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockGenreModel()))
  })
})
