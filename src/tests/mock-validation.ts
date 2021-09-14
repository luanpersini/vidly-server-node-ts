import { Validation } from '@/common/interfaces'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (obj: object, validationSchema: object): string  {
      return undefined
    }
  }
  return new ValidationStub()
}
