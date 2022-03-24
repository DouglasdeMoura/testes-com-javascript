import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from '.'

describe('<InputPrimitive.* />', () => {
  it('should render with the default id, name and for attributes', () => {
    render(<Input label="mock_label" />)

    const label = screen.getByText('mock_label')
    const input = screen.getByLabelText('mock_label')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()

    expect(label).toHaveAttribute('for', 'mockLabel')
    expect(input).toHaveAttribute('id', 'mockLabel')
    expect(input).toHaveAttribute('name', 'mockLabel')
  })

  it('should pass the `id` attribute to the `for` attribute of the label', () => {
    render(<Input label="mock_label" id="mock_id" />)

    const label = screen.getByText('mock_label')

    expect(label).toHaveAttribute('for', 'mock_id')
  })

  it('should validate a required input', () => {
    render(<Input label="mock_label" error="This input is required" required />)

    screen.getByLabelText('mock_label')

    userEvent.tab()
    userEvent.tab()

    expect(screen.getByText('This input is required')).toBeInTheDocument()
  })

  it('should validate an input with a defined minLength', () => {
    render(
      <Input label="mock_label" error="The minLength is 5" minLength={5} />,
    )

    userEvent.type(screen.getByLabelText('mock_label'), '123')
    userEvent.tab()

    expect(screen.getByText('The minLength is 5')).toBeInTheDocument()
  })

  it('should validate an input with a defined maxLength', () => {
    render(
      <Input
        label="mock_label"
        error="The maxLength is 5"
        defaultValue="1234567"
        maxLength={5}
      />,
    )
    const input = screen.getByLabelText('mock_label') as HTMLInputElement
    userEvent.type(input, '{backspace}')
    userEvent.tab()

    expect(screen.getByText('The maxLength is 5')).toBeInTheDocument()
  })

  it('should validate a pattern', () => {
    const handleOnBlur = jest.fn()

    render(
      <Input
        label="mock_label"
        error="You must enter three numbers"
        onBlur={handleOnBlur}
        pattern={'[0-9]{3}'}
      />,
    )

    const input = screen.getByLabelText('mock_label') as HTMLInputElement

    userEvent.type(input, '1234567')
    userEvent.tab()

    expect(handleOnBlur).toHaveBeenCalledTimes(1)
    expect(screen.getByText('You must enter three numbers')).toBeInTheDocument()
  })

  it('should validate a min and max range', () => {
    const handleOnBlur = jest.fn()

    render(
      <Input
        label="mock_label"
        error="You must enter a number between 3 and 5"
        onBlur={handleOnBlur}
        min={3}
        max={5}
      />,
    )

    userEvent.type(screen.getByLabelText('mock_label'), '1')
    userEvent.tab()

    expect(handleOnBlur).toHaveBeenCalledTimes(1)
    expect(
      screen.getByText('You must enter a number between 3 and 5'),
    ).toBeInTheDocument()

    userEvent.type(screen.getByLabelText('mock_label'), '5')
    userEvent.tab()

    expect(
      screen.getByText('You must enter a number between 3 and 5'),
    ).toBeInTheDocument()
  })

  it('should validate a custom function', () => {
    const customvalidator = jest.fn().mockReturnValue(false)

    render(
      <Input
        label="mock_label"
        error="Custom error"
        custom={customvalidator}
      />,
    )

    userEvent.type(screen.getByLabelText('mock_label'), '5')
    userEvent.tab()

    expect(customvalidator).toHaveBeenCalledWith('5')
    expect(screen.getByText('Custom error')).toBeInTheDocument()
  })

  it('should call the onValidate handler when the input is valid', () => {
    const onValidate = jest.fn()

    render(
      <Input
        label="mock_label"
        error="Required"
        onValidate={onValidate}
        required
      />,
    )

    userEvent.type(screen.getByLabelText('mock_label'), '1')
    userEvent.tab()

    expect(onValidate).toHaveBeenCalledWith('1')
  })

  it('should call the onError handler when the input is invalid', () => {
    const onError = jest.fn()

    render(
      <Input
        label="mock_label"
        error="Required"
        onError={onError}
        type="email"
      />,
    )

    userEvent.type(screen.getByLabelText('mock_label'), '1')
    userEvent.tab()

    expect(onError).toHaveBeenCalled()
  })

  it('should apply a mask to the value', () => {
    const onValidate = jest.fn()

    const mask = jest.fn().mockImplementation((value) =>
      value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'),
    )

    render(
      <Input
        label="mock_label"
        mask={mask}
        inputMode="numeric"
        pattern="\d{2}/\d{2}/\d{4}"
        onValidate={onValidate}
      />,
    )

    const input = screen.getByLabelText('mock_label') as HTMLInputElement

    userEvent.type(input, '2')
    expect(input).toHaveValue('2')

    userEvent.type(input, '0')
    expect(input).toHaveValue('20')

    userEvent.type(input, '1')
    expect(input).toHaveValue('20/1')

    userEvent.type(input, '1')
    expect(input).toHaveValue('20/11')

    userEvent.type(input, '1')
    expect(input).toHaveValue('20/11/1')

    userEvent.type(input, '9')
    expect(input).toHaveValue('20/11/19')

    userEvent.type(input, '9')
    expect(input).toHaveValue('20/11/199')

    userEvent.type(input, '0')
    expect(input).toHaveValue('20/11/1990')

    userEvent.tab()

    expect(onValidate).toHaveBeenCalledWith('20/11/1990')
  })
})
