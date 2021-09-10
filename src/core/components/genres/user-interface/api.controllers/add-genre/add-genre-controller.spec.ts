import { HttpRequest, Validation } from '@/common/interfaces'

import { AddGenreController } from './add-genre-controller'
import { MissingParamError } from '@/common/errors'
import { badRequest } from '@/common/helpers/http-helper'
import { mockValidation } from '@/tests/mock-validation'

type SutTypes = {
  sut: AddGenreController 
  validationStub: Validation
}

const makeSut = (): SutTypes => {  
  const validationStub = mockValidation()
  const sut = new AddGenreController(validationStub)
  return {
    sut,
    validationStub
  }
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    genre: 'any_genre'
  }
})


describe('AddGenreController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
