import { render, screen } from '@testing-library/react'

import { App } from './app'

describe('<App />', () => {
  it('should render the welcome message', () => {
    render(<App />)

    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
