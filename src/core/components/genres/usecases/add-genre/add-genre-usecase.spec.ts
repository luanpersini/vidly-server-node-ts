import { mockGenreModel, mockGenreRepository } from '@genres/tests.mocks'

import { AddGenreUsecase } from './add-genre-usecase'
import { GenresRepository } from '@/core/components/genres/repositories/genres-repository'

type SutTypes = {
  sut: AddGenreUsecase
  genreRepositoryStub: GenresRepository
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
const genreName = 'any_name'
const genreNameUpperFirst = 'Any_name'

describe('AddGenre Usecase', () => {
  test('should call GenresRepository.loadByName with the correct values', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    const Spy = jest.spyOn(genreRepositoryStub, 'loadByName')
    await sut.add(genreName)
    expect(Spy).toHaveBeenCalledWith(genreNameUpperFirst)
  })
    test('should return null case GenresRepository.loadByName doesnt return null', async () => {
    //if this happens, a genre with the given name already exists
    const { sut, genreRepositoryStub } = makeSut()
    jest
      .spyOn(genreRepositoryStub, 'loadByName')
      .mockReturnValueOnce(Promise.resolve(mockGenreModel()))
    const result = await sut.add(genreName)
    expect(result).toBeNull()
  })
  test('Should throw if GenresRepository.add throws', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    jest.spyOn(genreRepositoryStub, 'add').mockImplementationOnce(async () => {throw new Error()})
    const result = sut.add(genreName)
    await expect(result).rejects.toThrow()
  })
  test('should return the new genre on success', async () => {
    const { sut } = makeSut()    
    const result = await sut.add(genreName)
    expect(result).toEqual(mockGenreModel())
  })
})
