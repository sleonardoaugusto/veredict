import React from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { useField, useFormikContext, FormikValues } from 'formik'

type Option = {
  value: string
  label: string
}

interface SelectFieldProps {
  name: string
  options: Option[]
  isMulti?: boolean
  placeholder?: string
  onBlur?: (e: unknown) => void
}

export default function SelectField({
  name,
  options,
  isMulti = false,
  placeholder = '',
  onBlur,
}: SelectFieldProps) {
  const { setFieldValue } = useFormikContext<FormikValues>()
  const [field, meta] = useField<string | string[]>(name)

  const handleChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    if (isMulti) {
      setFieldValue(
        name,
        (selected as MultiValue<Option>)?.map((opt) => opt.value) ?? []
      )
    } else {
      setFieldValue(name, (selected as SingleValue<Option>)?.value ?? '')
    }
  }
  const getValue = () => {
    if (isMulti) {
      return options.filter((opt) =>
        Array.isArray(field.value) ? field.value.includes(opt.value) : false
      )
    }
    return options.find((opt) => opt.value === field.value) || null
  }

  return (
    <div className="w-full resize-none z-20">
      <Select
        name={name}
        options={options}
        value={getValue()}
        onChange={handleChange}
        onBlur={(e) => {
          field.onBlur({ target: { name } }) // Formik blur
          if (typeof onBlur === 'function') {
            onBlur(field.value) // custom onBlur
          }
        }}
        isMulti={isMulti}
        classNamePrefix="select"
        placeholder={placeholder}
      />
      {meta.touched && meta.error && (
        <div className="text-sm text-red-600 mt-1">{meta.error}</div>
      )}
    </div>
  )
}
