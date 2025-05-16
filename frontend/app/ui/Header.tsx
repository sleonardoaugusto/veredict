import { XMarkIcon } from '@heroicons/react/16/solid'
import React from 'react'

interface HeaderProps {
  title: string
  onCloseAction?: () => void
}

export default function Header({ title, onCloseAction }: HeaderProps) {
  return (
    <div className="p-4 flex justify-between items-center bg-foreground text-surface shadow-sm">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {onCloseAction && (
        <button
          onClick={onCloseAction}
          className="text-surface hover:text-accent transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
