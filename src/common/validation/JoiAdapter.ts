import Joi from 'joi'
import { Validation } from '../interfaces'

export class JoiAdapter implements Validation {
  validate(obj: any, validationSchema: any): string {
    const schema = validationSchema
    const { error } = schema.validate(obj)        
    return error.message  
  }  
}

