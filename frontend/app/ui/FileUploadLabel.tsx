import clsx from 'clsx'
import type { ReactNode } from 'react'
import React from 'react'

interface FileUploadLabelProps {
  htmlFor: string
  isSubmitting?: boolean
  children: ReactNode
}

export default function FileUploadLabel({
  htmlFor,
  isSubmitting,
  children,
}: FileUploadLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        'inline-flex items-center gap-1 px-3 py-1 text-sm font-medium border rounded transition',
        isSubmitting
          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
          : 'bg-foreground text-white border-foreground hover:bg-dark-blue hover:border-dark-blue cursor-pointer'
      )}
    >
      {children}
    </label>
  )
}
