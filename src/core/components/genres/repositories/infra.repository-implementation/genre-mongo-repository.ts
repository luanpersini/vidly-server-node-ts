import { GenreModel } from '../../domain/genre'
import { GenreRepository } from '../genre-repository'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'

export class GenreMongoRepository implements GenreRepository {
  constructor (
    private readonly collection: string = 'genre'
  ) {}
  async add (name: string): Promise<GenreModel> {
    const genreCollection = await MongoHelper.getCollection(this.collection)
    const result = await genreCollection.insertOne(name)
    return result.ops[0]
  }

  async loadByName(name: string): Promise<GenreModel> {
    const genreCollection = await MongoHelper.getCollection(this.collection)
    const bankAccount = await genreCollection.findOne({ name })
    return bankAccount
  }
}