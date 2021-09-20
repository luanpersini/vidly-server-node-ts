import { Controller } from '@/common/interfaces'
import { LoadGenresController } from './load-genres-controller'
import { makeLoadGenresUsecase } from '../../usecases/load-genres/infra.load-genres-usecase-factory'

export const makeLoadGenresController = (): Controller => {
  return new LoadGenresController(makeLoadGenresUsecase())
}