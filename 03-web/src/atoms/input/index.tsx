import * as S from './input.styles'

type InputProps = {
  label: string
} & React.ComponentProps<typeof S.Input>

const Input = ({ label, ...props }: InputProps) => (
  <S.Root>
    <S.Label>{label}</S.Label>
    <S.Input {...props} />
    <S.Error />
  </S.Root>
)

export default Input
