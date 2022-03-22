import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import supertest from 'supertest'
import * as utils from './utils/index.js'

import { app } from './app.js'

let server
let request
let spy

beforeAll(() => {
  server = app.listen()
  request = supertest(server)

  spy = vi.spyOn(utils, 'cognitoLogin')
})

beforeEach(() => {
  spy.mockImplementationOnce(() => false)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('API', () => {
  it('deve voltar uma mensagem de erro quando não houver usuário e senha na requisição', async () => {
    const response = await request.post('/login')
    console.log(response.body)
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
    vi.resetAllMocks()
    spy.mockImplementationOnce(() => true)

    const response = await request.post('/login').send({ username: 'admin', password: 'test' })

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Sucesso no login!')
  })
})

