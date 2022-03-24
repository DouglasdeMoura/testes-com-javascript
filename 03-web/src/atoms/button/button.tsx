import { FC, forwardRef } from 'react'

import * as S from './button.styles'

type ButtonProps = {
  children?: React.ReactNode
} & React.ComponentPropsWithRef<'button'>

export const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <S.Button ref={ref} {...props} />
})

Button.displayName = 'Button'
