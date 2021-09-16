import Joi from 'joi';
import { addGenreValidationSchema } from './add-genre-joi-validation-schema';
import convert from 'joi-to-json'

const addGenreValidationSchemaConverted = convert(addGenreValidationSchema);

describe('AddGenreController', () => {
  test('should ensure there will be no unwanted changes to addGenreValidationSchema', async () => {
    const validationSchema = convert(Joi.object({
      name: Joi.string().min(3).max(30).required()
    })) 
    expect(validationSchema).toEqual(addGenreValidationSchemaConverted)
  })   
})
