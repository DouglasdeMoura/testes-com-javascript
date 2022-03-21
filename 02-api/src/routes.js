import Router from '@koa/router'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { message: 'Olá' }
})

router.post('/login', (ctx) => {
  ctx.body = { message: 'Sucesso no login!' }
})

export const routes = router.routes()
