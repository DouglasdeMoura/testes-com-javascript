import Router from '@koa/router'
import { cognitoLogin } from '../utils/index.js'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { message: 'Olá' }
})

router.post('/login', async (ctx) => {
  try {
    ctx.assert(ctx.request.body.username, 401, 'Insira o seu usuário')
    ctx.assert(ctx.request.body.password, 401, 'Insira sua senha')
  } catch (err) {
    ctx.status = 401
    ctx.body = { message: err.message }
    return
  }

  const isLoggedIn = cognitoLogin(ctx.request.body?.username, ctx.request.body?.password)

  if (!isLoggedIn) {
    ctx.status = 401
    ctx.body = { message: 'Usuário ou senha inválidos' }
    return
  }

  ctx.body = {
    message: 'Sucesso no login!'
  }
})

export const routes = router.routes()
