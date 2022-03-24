import { forwardRef, useEffect, useRef } from 'react'
import { createContext, useContext, useState } from 'react'

import useMergedRef from '@react-hook/merged-ref'
import { camelCase } from 'lodash' 

/**
 * Validation
 */

type Errors = {
  type?: string
  minLength?: string
  maxLength?: string
  min?: string
  max?: string
  pattern?: string
  required?: string
  custom?: string
}

type ErrorMessages = string | Errors

type ValidationResult = {
  valid: boolean
  errors?: {
    type: keyof Errors
    message: string
  }[]
}

function validate(
  props: Pick<
    InputProps,
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'type'
    | 'min'
    | 'max'
    | 'custom'
  >,
  element: React.RefObject<HTMLInputElement>,
  messages?: ErrorMessages,
): ValidationResult {
  const validators = {
    required: element.current?.validity.valueMissing,
    minLength:
      element.current?.validity.tooShort ||
      (props?.minLength && element!.current!.value.length < props.minLength),
    maxLength:
      element.current?.validity.tooLong ||
      (props?.maxLength && element!.current!.value.length > props.maxLength),
    pattern: element.current?.validity.patternMismatch,
    type: element.current?.validity.typeMismatch,
    min:
      element.current?.validity.rangeUnderflow ||
      (props?.min && Number(element!.current!.value) < props.min),
    max:
      element.current?.validity.rangeOverflow ||
      (props?.max && Number(element!.current!.value) > props.max),
    custom: props?.custom && !props.custom?.(element!.current!.value),
  }

  const errors: ValidationResult['errors'] = []

  for (const [validation, invalid] of Object.entries(validators)) {
    if (invalid) {
      errors.push({
        type: validation as keyof Errors,
        message:
          (typeof messages === 'object'
            ? messages[validation as keyof Errors]
            : messages) || '',
      })
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    }
  }

  return { valid: true }
}

/**
 * Create context for the input
 */

type FieldContextData = {
  id: string
  label: string
  errors: ValidationResult['errors'] | null
  setId: (id: string) => void
  setLabel: (label: string) => void
  setErrors: (errors?: ValidationResult['errors']) => void
}

type RootProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const FieldContext = createContext({} as FieldContextData)

export const Root: React.FC<RootProps> = ({ children, ...props }) => {
  const [id, setId] = useState('')
  const [label, setLabel] = useState('')
  const [errors, setErrors] = useState<ValidationResult['errors'] | undefined>()

  return (
    <FieldContext.Provider
      value={{
        id,
        label,
        errors,
        setId,
        setLabel,
        setErrors,
      }}
    >
      <div {...props} data-invalid={!!errors}>
        {children}
      </div>
    </FieldContext.Provider>
  )
}

const useFieldContext = () => useContext(FieldContext)

/**
 * Container to display the error message
 */

type ErrorProps = React.HTMLAttributes<HTMLParagraphElement>

export const Error: React.FC<ErrorProps> = ({ ...props }) => {
  const { errors } = useFieldContext()

  return errors ? (
    <p {...props} data-error>
      {errors[0].message}
    </p>
  ) : null
}

/**
 * Label component
 */

type LabelProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLLabelElement>

export const Label: React.FC<LabelProps> = ({ children, id, ...props }) => {
  const { id: inputId, setLabel, errors } = useFieldContext()

  useEffect(() => {
    setLabel(children?.toString() || '')
  }, [children, setLabel])

  return (
    <label htmlFor={id || inputId} {...props} data-invalid={!!errors}>
      {children}
    </label>
  )
}

/**
 * The input component
 */

type InputProps = {
  error?: ErrorMessages
  mask?: (value: string) => string
  custom?: (value: string) => boolean
  onError?: (value: string, errors: ValidationResult['errors']) => void
  onValidate?: (value: string) => void
} & React.ComponentPropsWithRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { custom, error, mask, onBlur, onChange, onError, onValidate, ...props },
    ref,
  ) => {
    const { setId, label, setErrors, errors } = useFieldContext()

    const inputRef = useRef<HTMLInputElement>(null)

    const id = props?.id || camelCase(label)
    const name = props?.name || id

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)

      const validation = validate({ custom, ...props }, inputRef, error)

      if (!validation.valid) {
        setErrors(validation.errors)
        onError?.(inputRef.current?.value || '', errors || [])
        return
      }

      onValidate?.(inputRef.current?.value || '')
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)

      if (mask && typeof mask === 'function') {
        inputRef!.current!.value = mask(e.target.value)
      }

      if (errors) {
        setErrors(undefined)
      }
    }

    useEffect(() => {
      setId(id)
    }, [id, setId])

    return (
      <input
        {...props}
        id={id}
        data-invalid={!!errors}
        name={name}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        ref={useMergedRef(ref, inputRef)}
      />
    )
  },
)

Input.displayName = 'Input'