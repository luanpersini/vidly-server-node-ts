import { GenreModel } from '../domain/genre';

export const mockGenreModel = (): GenreModel => ({
  id: 'any_id',
  name: 'any_name'
})

export const mockGenreModels = (): GenreModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name'
  }, {
    id: 'other_id',
    name: 'other_name'
  }]
}