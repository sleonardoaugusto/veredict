'use client'

import clsx from 'clsx'
import React, { ReactNode } from 'react'

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
          : 'bg-[#1E2A38] text-white border-[#1E2A38] hover:bg-[#2B3C4F] hover:border-[#2B3C4F] cursor-pointer'
      )}
    >
      {children}
    </label>
  )
}
