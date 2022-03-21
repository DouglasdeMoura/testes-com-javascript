import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'

import { routes } from './routes.js'

const app = new Koa()

app
  .use(cors({ origin: '*' }))
  .use(koaBody())
  .use(routes)

export { app }

