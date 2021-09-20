import { mockGenreModels, mockGenreRepository } from '@genres/tests.mocks'

import { GenresRepository } from '@/core/components/genres/repositories/genres-repository'
import { LoadGenresUsecase } from './load-genres-usecase'
import { throwError } from '@/tests/test-helper'

type SutTypes = {
  sut: LoadGenresUsecase
  genreRepositoryStub: GenresRepository
}

const makeSut = (): SutTypes => {
  const genreRepositoryStub = mockGenreRepository()
  const sut = new LoadGenresUsecase(genreRepositoryStub)
  return {
    sut,
    genreRepositoryStub
  }
}

describe('LoadGenres Usecase', () => {
  test('Should call GenresRepository.loadAll', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    const Spy = jest.spyOn(genreRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(Spy).toHaveBeenCalled()
  })
  test('Should return a list of Genres on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(mockGenreModels())
  })
  
  test('Should throw if GenresRepository.loadAll throws', async () => {
    const { sut, genreRepositoryStub } = makeSut()
    jest.spyOn(genreRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})

