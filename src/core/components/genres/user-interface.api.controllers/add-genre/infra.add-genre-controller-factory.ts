import { AddGenreController } from './add-genre-controller'
import { Controller } from '@/common/interfaces'
import { addGenreValidationSchema } from './add-genre-joi-validation-schema'
import { makeAddGenreUsecase } from '@genres/usecases/add-genre/infra.add-genre-usecase-factory'
import { makeValidation } from '@/common/validation/validate-factory'

const validationSchema = addGenreValidationSchema

export const makeAddGenreController = (): Controller => {
  return new AddGenreController(makeValidation(), makeAddGenreUsecase(), validationSchema )
}