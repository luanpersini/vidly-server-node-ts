import { GenreModel } from '../domain/genre'
import { GenresRepository } from './genres-repository'
import { MongoHelper } from '@/infra/persistence/db/helpers/mongo-helper'

export class GenreMongoRepository implements GenresRepository {
  constructor(
    private readonly collection: string = 'genres'
    ) {}
  async add(name: string): Promise<GenreModel> {
    const genreCollection = await MongoHelper.getCollection(this.collection)
    const result = await genreCollection.insertOne({name})
    return MongoHelper.map(result.ops[0])
  }
  async loadAll(): Promise<GenreModel[]> {  
    const genreCollection = await MongoHelper.getCollection(this.collection)
    const result = await genreCollection.find().toArray()
    return MongoHelper.mapCollection(result) 
  }
  async loadByName(name: string): Promise<GenreModel> {
    const genreCollection = await MongoHelper.getCollection(this.collection)
    const result = await genreCollection.findOne({name})
    return result && MongoHelper.map(result)
  }
}
