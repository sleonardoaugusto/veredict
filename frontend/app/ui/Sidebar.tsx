import React, { useEffect, ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/16/solid'

interface SidebarProps {
  isOpen: boolean
  onCloseAction: () => void
  title?: string
  children: ReactNode
}

export default function Sidebar({
  isOpen,
  onCloseAction,
  title,
  children,
}: SidebarProps) {
  // Close sidebar on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseAction()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCloseAction])

  return (
    <>
      {/* Overlay to dim the background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onCloseAction}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full overflow-auto w-1/2 bg-white shadow-lg transform transition-transform z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-test="sidebar"
      >
        {/* Header with Close Icon */}
        <div className="p-4 flex justify-between items-center bg-sky-100 text-gray-900">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onCloseAction} className="hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 space-y-6">{children}</div>
      </div>
    </>
  )
}
