import { useField } from 'formik'
import type { InputHTMLAttributes, FocusEventHandler } from 'react'

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string
  placeholder?: string
  className?: string
  as?: 'input' | 'textarea'
  rows?: number
  onBlur?: FocusEventHandler<any>
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
  const [field, meta] = useField(name)

  const baseClass = `w-full rounded-md px-3 py-2 
    border ${meta.touched && meta.error ? 'border-red-500' : 'border-border'} 
    bg-surface text-foreground placeholder-gray-400 shadow-sm transition
    focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
  `

  return (
    <div className="w-full">
      {as === 'textarea' ? (
        <textarea
          {...field}
          placeholder={placeholder}
          rows={rows}
          onBlur={onBlur}
          className={`${baseClass} ${className}`}
          {...props}
        />
      ) : (
        <input
          {...field}
          placeholder={placeholder}
          onBlur={onBlur}
          className={`${baseClass} ${className}`}
          {...props}
        />
      )}
      {meta.touched && meta.error && (
        <div className="text-sm text-red-600 mt-1">{meta.error}</div>
      )}
    </div>
  )
}
