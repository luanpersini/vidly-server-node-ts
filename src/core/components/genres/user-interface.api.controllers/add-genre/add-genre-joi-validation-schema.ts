import Joi from 'joi';

export const addGenreValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
}) 