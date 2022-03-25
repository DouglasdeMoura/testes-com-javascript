import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import supertest from 'supertest'

import { app } from './app.js'

let server
let request

beforeAll(() => {
  server = app.listen()
  request = supertest(server)
})


describe('API', () => {
  it('deve voltar uma mensagem de erro quando não houver usuário e senha na requisição', async () => {
    const response = await request.post('/login')

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Insira o seu usuário')
  })

  it('deve voltar uma mensagem de erro quando não houver senha na requisição', async () => {
    const response = await request.post('/login').send({ username: 'admin' })

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Insira sua senha')
  })

  it('deve voltar uma mensagem de erro quando não houver usuário na requisição', async () => {
    const response = await request.post('/login').send({ password: 'test' })

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Insira o seu usuário')
  })

  it('deve logar o usuário', async () => {
    const response = await request.post('/login').send({ username: 'test@example.com', password: 'test' })

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Sucesso no login!')
  })
})

