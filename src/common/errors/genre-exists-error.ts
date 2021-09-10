export class GenreExistsError extends Error {
  constructor () {
    super('A genre with the given name already exists')
    this.name = 'GenreExistsError'
  }
}
