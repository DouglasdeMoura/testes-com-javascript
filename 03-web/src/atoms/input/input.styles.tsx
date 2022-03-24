import { styled } from '@stitches/react'
import * as InputPrimitive from './input'

export const Root = styled(InputPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontFamily: 'system-ui, sans-serif',
})

export const Label = styled(InputPrimitive.Label, {
  fontWeight: 'bold',
  fontSize: '0.75rem',
  fontFamily: 'system-ui, sans-serif',
})

export const Input = styled(InputPrimitive.Input, {
  border: '1px solid #ccc',
  borderRadius: '0.25rem',
  padding: '0.5rem',
  fontFamily: 'inherit',
  '&:disabled': {
    background: '#eee',
    cursor: 'not-allowed',
  }
})

export const Error = styled(InputPrimitive.Error, {
  color: 'red',
  fontSize: '0.75rem',
  margin: 0,
})
