import { mockGenre, mockGenreRepository } from '@genres/tests.mocks'

import { AddGenreUsecase } from './add-genre-usecase'
import { GenreRepository } from '@genres/repositories/genre-repository'
import { throwError } from '@/tests/test-helper'

type SutTypes = {
  sut: AddGenreUsecase
  genreRepositoryStub: GenreRepository
}

const makeSut = (): SutTypes => {
  const genreRepositoryStub = mockGenreRepository()
  // Success cenario: Spy on loadByName to return null
  jest.spyOn(genreRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
  const sut = new AddGenreUsecase(genreRepositoryStub)
  return {
    sut,
    genreRepositoryStub
  }
}
const genre_name = 'any_name'

describe('Genre Usecase', () => {
  test('should call GenreRepository.loadByName with the correct values', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    const Spy = jest.spyOn(genreRepositoryStub, 'loadByName')
    await sut.add(genre_name)
    expect(Spy).toHaveBeenCalledWith(genre_name)
  })
    test('should return null case GenreRepository.loadByName doesnt return null', async () => {
    //if this happens, a genre with the given name already exists
    const { sut, genreRepositoryStub } = makeSut()
    jest
      .spyOn(genreRepositoryStub, 'loadByName')
      .mockReturnValueOnce(Promise.resolve(mockGenre()))
    const result = await sut.add(genre_name)
    expect(result).toBeNull()
  })
  test('Should throw if GenreRepository.add throws', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    jest.spyOn(genreRepositoryStub, 'add').mockImplementationOnce(async () => {throw new Error()})
    const result = sut.add(genre_name)
    await expect(result).rejects.toThrow()
  })
  test('should return the new genre on success', async () => {
    const { sut, genreRepositoryStub } = makeSut()    
    const result = await sut.add(genre_name)
    expect(result).toEqual(mockGenre())
  })
})
