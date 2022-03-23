import { FC, useState } from 'react'
import { client } from './api/client'

export const App: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    setIsSubmitting(true)
    
    client.post<{ message: string }>(
      'http://localhost:3001/login',
      data
    )
      .then(async (res) => {
        if (res.status !== 200) {
          setIsError(true)
          setErrorMessage(res.data.message)
        } else {
          setSuccessMessage(res.data.message)
        }
      })
      .catch((err) => {
        setIsError(true)
        setErrorMessage(err.response.data.message)
      })
      .finally(() => setIsSubmitting(false))

  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="username" placeholder="Usuário" />
        </p>
        <p>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" name="password" placeholder="Senha" />
        </p>
        {isError && errorMessage && <p>{errorMessage}</p>}
        {sucessMessage && <p>{sucessMessage}</p>}
        <button disabled={isSubmitting}>Entrar</button>
      </form>
    </div>
  )
}
