import Joi from 'joi';
import { MissingParamError } from '@/common/errors';

export const addGenreValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
}) 