export interface Validation {
  validate (obj: any, schema: any): string
}
//use with: if (error) {return badRequest(new ValidationError(error))}
