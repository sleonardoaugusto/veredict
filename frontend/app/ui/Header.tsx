import { XMarkIcon } from '@heroicons/react/16/solid'
import React from 'react'

interface HeaderProps {
  title: string
  onCloseAction?: () => void
}

export default function Header({ title, onCloseAction }: HeaderProps) {
  return (
    <div className="p-4 flex justify-between items-center bg-blue-200 text-blue-900">
      {title && <h2 className="text-lg font-medium">{title}</h2>}
      {onCloseAction && (
        <button onClick={onCloseAction} className="hover:text-blue-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
