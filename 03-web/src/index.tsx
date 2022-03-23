import ReactDOM from 'react-dom'

import { App } from './app'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
