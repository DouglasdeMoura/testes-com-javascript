import { styled } from '@stitches/react'

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
  fontFamily: 'system-ui, sans-serif',
  background: 'rebeccapurple',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  '&:hover': {
    filter: 'brightness(110%)',
  },
  '&:active': {
    filter: 'brightness(80%)',
  },
})
