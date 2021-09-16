import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }       
    return this.client.db().collection(name)
  },
//  async cleanup(collections) {    
//     if (!this.client) {
//       await this.connect(this.uri)
//     }
//      return Promise.all(collections.map((c: string) => this.client.db().collection(c).deleteMany({})))    
//   },
   
  map: (data: any): any => {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
