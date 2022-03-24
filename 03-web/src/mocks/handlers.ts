import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:3001/login', (req, res, ctx) => {
    const body = req.body as { email: string, password: string }

    if (body.email === 'admin@admin' && body.password === 'admin') {
      return res(ctx.status(401), ctx.json({ message: 'Usuário ou senha inválidos' }))
    }

    return res(ctx.status(200), ctx.json({ message: 'Login realizado com sucesso' }))
  }), 
]
