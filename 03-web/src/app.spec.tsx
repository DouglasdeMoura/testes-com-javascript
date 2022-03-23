import { render, screen } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'

import { App } from './app'

describe('<App />', () => {
  it('deve exibir o formulário de login', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' } )).toBeInTheDocument()
  })

  it('deve exibir a mensagem de erro', async () => {
    render(<App />)

    expect(screen.queryByText('Usuário ou senha inválidos')).not.toBeInTheDocument()

    userEvent.type(screen.getByLabelText('Email'), 'admin')
    userEvent.type(screen.getByLabelText('Senha'), 'admin')

    const button = screen.getByRole('button', { name: 'Entrar' })
    userEvent.click(button)

    expect(await screen.findByText('Usuário ou senha inválidos')).toBeInTheDocument()
  })

  it('deve exibir a mensagem de sucesso',  async () => {
    render(<App />)

    expect(screen.queryByText('Login realizado com sucesso')).not.toBeInTheDocument()

    userEvent.type(screen.getByLabelText('Email'), 'test')
    userEvent.type(screen.getByLabelText('Senha'), 'test')

    const button = screen.getByRole('button', { name: 'Entrar' })
    userEvent.click(button)

    expect(await screen.findByText('Login realizado com sucesso')).toBeInTheDocument()
  })
})
