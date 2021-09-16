import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { MissingParamError } from '@/common/errors'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'
import app from '@/common/server/config/app'
import request from 'supertest'

describe('Genres Routes', () => {
  const addGenreRoute = '/api/add-genre'
  let name = 'any_genre'

  const exec = () => {
    return request(app).post(addGenreRoute).send({ name }).expect('Content-Type', /json/)
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /add-genre', () => {
    test('should Return **Ok** with the created genre data', async () => {
      const {status, body: result} = await exec()
      expect(status).toBe(200)
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(name)
    })
    test('should return 403 if genre already exist', async () => {
      const {status, body: result} = await exec()
      expect(status).toBe(403)
      expect(result.error).toEqual(new GenreExistsError().message)
    })
    test('should return 400 if name is not provided', async () => {
      const {status, body: result} = await request(app).post(addGenreRoute).send({}).expect('Content-Type', /json/)
      expect(status).toBe(400)
      expect(result.error).toEqual(new MissingParamError('name').message)
    })
    test('should return 400 if validation error occurs', async () => {
      name = ''
      const {status, body: result} = await exec()
      expect(status).toBe(400)
    })
  }) // End of Post Routes
}) //end of describe
