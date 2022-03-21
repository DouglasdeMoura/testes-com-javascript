import { describe, it, expect, beforeAll } from 'vitest'
import supertest from 'supertest'

import { app } from './app.js'

let server
let request

beforeAll(() => {
  server = app.listen()
  request = supertest(server)
})

describe('API', () => {
  it('deve voltar uma mensagem de sucesso', async () => {
    const response = await request.post('/login')

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Sucesso no login!')
  })
})

