import 'dotenv/config'
import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'

import { routes } from './routes.js'
import { seed } from './db/seed.js'

let db

if (process.env.DB = 'memory') {
  const models = await seed()

  db = models
} else {
  db = null
}

const app = new Koa()

app
  .use(cors({ origin: '*' }))
  .use(koaBody())
  .use((ctx, next) => {
    ctx.state.db = db
    return next()
  })
  .use(routes)

export { app }
