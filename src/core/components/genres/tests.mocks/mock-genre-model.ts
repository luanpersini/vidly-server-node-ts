import { GenreModel } from '../domain/genre';

export const mockGenreModel = (): GenreModel => ({
  id: 'any_id',
  name: 'any_name'
})

export const mockGenreModels = (): GenreModel[] => {
  return [{
    id: 'Any_id',
    name: 'Any_name'
  }, {
    id: 'Other_id',
    name: 'Other_name'
  }]
}