import { Collection } from 'mongodb'
import { GenreMongoRepository } from './infra.genres-mongo-repository'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'

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

  describe('add()', () => {
    test('should return a genre on success', async () => {
      const sut = makeSut()
      const result = await sut.add(genre_name)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(genre_name)
    })
  })
  describe('loadAll()', () => {
    test('should return a list of genres on success', async () => {
      const sut = makeSut()
      await genreCollection.insertMany([{ name: 'any_name' },{ name: 'other_name' }])
      const result = await sut.loadAll() 
      expect(result).toBeTruthy()
      expect(result.length).toBe(2)
      expect(result[0].id).toBeTruthy()
      expect(result[0].name).toBe('any_name')
      expect(result[1].id).toBeTruthy()
      expect(result[1].name).toBe('other_name')  
    })
    test('should return an empty list if loadAll dont find anything', async () => {
      const sut = makeSut()
      const result = await sut.loadAll()
      expect(result.length).toBe(0)
    })    
  })
  describe('loadByName()', () => {
    test('should return an genre on success', async () => {
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
