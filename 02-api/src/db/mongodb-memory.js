import { MongoMemoryServer } from 'mongodb-memory-server'

export const mongod = await MongoMemoryServer.create({
  instance: {
    dbName: 'test',
  }
})