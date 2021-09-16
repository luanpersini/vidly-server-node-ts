import { Collection } from 'mongodb'
import { GenreMongoRepository } from './infra.genres-mongo-repository'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'
import { mockGenreModel } from '@genres/tests.mocks'

let genreCollection: Collection

describe('Genres Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    genreCollection = await MongoHelper.getCollection('genres')
    await genreCollection.deleteMany({})
    
  })  
  const makeSut = (): GenreMongoRepository => {
    return new GenreMongoRepository()
  }
  const genre_name = 'any_name'

  describe('open()', () => {
    test('should return a genre on success', async () => {
      const sut = makeSut()
      const result = await sut.add(genre_name)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(genre_name)
    })
  })
  describe('loadByName()', () => {
    test('should return an account on loadByName success', async () => {
      const sut = makeSut()
      await genreCollection.insertOne({ name: genre_name })
      const result = await sut.loadByName(genre_name)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(genre_name)
    })
    test('should return null if loadByName dont find anything', async () => {
      const sut = makeSut()
      const result = await sut.loadByName('genre_name')
      expect(result).toBeFalsy()
    })
  })
  // End
})
