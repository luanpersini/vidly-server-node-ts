import { Controller, Validation } from '@/common/interfaces'

import { AddGenre } from '@genres/usecases/add-genre/add-genre'
import { AddGenreController } from '@genres/user-interface.api.controllers/add-genre/add-genre-controller'
import { AddGenreUsecase } from '@/core/components/genres/usecases/add-genre/add-genre-usecase'
import { GenreExistsError } from '@/common/errors/genre-exists-error'
import { GenreMongoRepository } from '@/core/components/genres/repositories/infra.genres-mongo-repository'
import { JoiAdapter } from '@/common/validation/JoiAdapter'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'
import app from '@/common/server/config/app'
import { makeAddGenreController } from '@/core/components/genres/user-interface.api.controllers/add-genre/infra.add-genre-controller-factory'
import { mockAddGenre } from '@genres/tests.mocks'
import { mockValidation } from '@/tests/mock-validation'
import request from 'supertest'

type SutTypes = {
  sut: Controller  
}

const makeSut = (): SutTypes => {
  const sut = makeAddGenreController()
  return {
    sut
  }
}

describe('Genres Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  const addGenreRoute = '/api/add-genre'
  describe('POST /add-genre', () => {
    test('should Return **Ok** with the created genre data', async () => {
     await request(app)
        .post(addGenreRoute)
        .send({
          name: 'any_genre'                  
        })
        .expect("Content-Type", /json/)
        .expect(200)      
    })
    test('should return 400 on validation error', async () => {
      await request(app)
        .post(addGenreRoute)
        .send({                         
        })
        .expect(400)      
    })
    test('should return 403 if genre already exist', async () => {
      const response = await request(app)
        .post(addGenreRoute)
        .send({
          name: 'any_genre'                  
        })
        
        expect(response.statusCode).toEqual(403) 
        expect(response.body.error).toEqual(new GenreExistsError().message)             
    })
  }) // End of Post Routes

  
}) //end


