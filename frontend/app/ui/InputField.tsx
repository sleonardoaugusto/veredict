import { Field } from 'formik'

type InputFieldProps = {
  name: string
  placeholder: string
  onBlur: () => void
  className?: string
}

export function InputField({
  name,
  placeholder,
  onBlur,
  className = '',
}: InputFieldProps) {
  const baseClass = 'w-full border border-gray-300 rounded-md p-2 resize-none'

  return (
    <Field
      name={name}
      placeholder={placeholder}
      className={`${baseClass} ${className}`}
      onBlur={onBlur}
    />
  )
}
