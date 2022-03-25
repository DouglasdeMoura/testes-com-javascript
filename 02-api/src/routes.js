import Router from '@koa/router'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { message: 'Olá' }
})

router.post('/login', async (ctx) => {
  ctx.set('Content-type', 'application/json')

  // TODO: Retornar os erros no seguinte formato https://datatracker.ietf.org/doc/html/rfc7807

  try {
    ctx.assert(ctx.request.body.username, 401, 'Insira o seu usuário')
    ctx.assert(ctx.request.body.password, 401, 'Insira sua senha')
  } catch (err) {
    ctx.status = 401
    ctx.body = { message: err.message }
    return
  }

  // TODO: fazer o hash da senha

  const isLoggedIn = await ctx.state.db.User.findOne({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  })

  if (!isLoggedIn) {
    ctx.status = 401
    ctx.body = { message: 'Usuário ou senha inválidos' }
    return
  }

  // TODO: retornar o token de autenticação

  ctx.body = {
    message: 'Sucesso no login!'
  }
})

export const routes = router.routes()
