import { Field } from 'formik'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  className?: string
  as?: 'input' | 'textarea'
  rows?: number
}

export function InputField({
  name,
  placeholder,
  onBlur,
  className = '',
  as = 'input',
  rows = 3,
  ...props
}: InputFieldProps) {
  const baseClass =
    'w-full rounded-md px-3 py-2 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm ' +
    'focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition'

  return (
    <Field
      name={name}
      placeholder={placeholder}
      className={`${baseClass} ${className}`}
      onBlur={onBlur}
      as={as}
      rows={3}
      {...props}
    />
  )
}
