import mongoose from 'mongoose'
import { mongod as memoryMongod } from './mongodb-memory.js'

export async function seed() {
  mongoose.connect(memoryMongod.getUri(), { dbName: 'test' })
  const User = mongoose.model('User', { username: String, password: String })
  const user = new User({ username: 'test@example.com', password: 'test' })
  await user.save()

  return {
    User,
  }
}