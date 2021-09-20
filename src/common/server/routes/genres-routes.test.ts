import { Collection } from 'mongodb'
import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'
import app from '@/common/server/config/app'
import request from 'supertest'

describe('Genres Routes', () => {
  const addGenreRoute = '/api/add-genre'
  const loadGenresRoute = '/api/load-genres'
  let name = 'any_genre'
  const nameUpperFirst = 'Any_genre'
  let genreCollection: Collection

  const exec = () => {
    return request(app).post(addGenreRoute).send({ name }).expect('Content-Type', /json/)
  }

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

  describe('POST /add-genre', () => {
    test('should Return **Ok** with the created genre data', async () => {
      const {status, body: result} = await exec()
      expect(status).toBe(200)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(nameUpperFirst)
    })
    test('should return 403 if genre already exist', async () => {
      await genreCollection.insertOne({ name: nameUpperFirst })
      const {status, body: result} = await exec()
      expect(status).toBe(403)
      expect(result.error).toEqual(new GenreExistsError().message)
    })   
    test('should return 400 if validation error occurs', async () => {
      name = ''
      const {status, body: result} = await exec()
      expect(status).toBe(400)
    })
  }) // End of Add-Genres Routes

  describe('GET /load-genres', () => {
    test('should Return **Ok** with the list of genres', async () => {
      await genreCollection.insertMany([{ name: 'Any_name' },{ name: 'Other_name' }])
      const {status, body: result} = await request(app).get(loadGenresRoute).send({}).expect('Content-Type', /json/)
      expect(status).toBe(200)
      expect(result).toBeTruthy()
      expect(result[0].id).toBeTruthy()
      expect(result[0].name).toEqual('Any_name')
      expect(result[1].id).toBeTruthy()
      expect(result[1].name).toEqual('Other_name')
    })
    test('should return an empty list if no genres where found', async () => {      
      const {status, body: result} = await request(app).get(loadGenresRoute).send({}).expect('Content-Type', /json/)      
      expect(status).toBe(200)
      expect(result).toBeTruthy()
      expect(result.length).toBe(0)
    }) 
  }) // End of Load Genres Routes
}) //end of describe
