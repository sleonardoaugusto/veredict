import { Field } from 'formik'

type InputFieldProps = {
  name: string
  placeholder: string
  onBlur: () => void
}

export function InputField({ name, placeholder, onBlur }: InputFieldProps) {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2 resize-none"
      onBlur={onBlur}
    />
  )
}
