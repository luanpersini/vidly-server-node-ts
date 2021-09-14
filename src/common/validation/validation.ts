export interface Validation {
  validate (obj: object, validationSchema: object): string
}
//use with: if (error) {return badRequest(new ValidationError(error))}
