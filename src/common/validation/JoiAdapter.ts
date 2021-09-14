import Joi, { ObjectSchema } from 'joi'

import { Validation } from '../interfaces'

export class JoiAdapter implements Validation {
  validate(obj: object, validationSchema: ObjectSchema): string {
    const schema = validationSchema
    const { error } = schema.validate(obj)        
    return error.message  
  }  
}

