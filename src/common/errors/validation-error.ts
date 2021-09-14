export class ValidationError extends Error {
  //used to display third party validation errors
  constructor (message: string) {
    super(`${message}`)
    this.name = 'ValidationError'
  }
}
