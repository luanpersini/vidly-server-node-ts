import { AddGenreController } from '../add-genre-controller'
import { Controller } from '@/common/interfaces'
import Joi from 'joi'
import { makeAddGenreUsecase } from '@genres/usecases/add-genre/infra.add-genre-usecase-factory'
import { makeValidation } from '@/common/validation/validate-factory'

const validationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required()
}) 

export const makeAddGenreController = (): Controller => {
  return new AddGenreController(makeValidation(), makeAddGenreUsecase(), validationSchema )
}