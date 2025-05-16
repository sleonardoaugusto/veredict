import { Field } from 'formik'

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string
  placeholder?: string
  className?: string
  as?: 'input' | 'textarea'
  rows?: number
  onBlur?: React.FocusEventHandler<any>
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
  const baseClass = `w-full rounded-md px-3 py-2 
    border border-border bg-surface text-foreground placeholder-gray-400 shadow-sm transition
    focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
  `

  return (
    <Field
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      as={as}
      className={`${baseClass} ${className}`}
      {...(as === 'textarea' ? { rows } : {})}
      {...props}
    />
  )
}
