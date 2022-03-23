import { FC, useState } from 'react'

export const App: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    setIsSubmitting(true)
    
    fetch(
      'http://localhost:3001/login',
      { method: 'POST', body: JSON.stringify(data) }
    )
      .then(async (res) => {
        const response = await res.json()

        if (!res.ok) {
          setIsError(true)
          setErrorMessage(response.message)
        } else {
          alert(response.message)
        }
      })
      .finally(() => setIsSubmitting(false))

  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuário" /><br />
        <input type="password" name="password" placeholder="Senha" /><br />
        {isError && errorMessage && <p>{errorMessage}</p>}
        <button disabled={isSubmitting}>Login</button>
      </form>
    </div>
  )
}
