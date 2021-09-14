import { Validation } from '@/common/interfaces'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (obj: any, schema: any): string  {
      return undefined
    }
  }
  return new ValidationStub()
}
