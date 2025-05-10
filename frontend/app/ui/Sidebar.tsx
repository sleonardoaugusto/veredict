import React, { useEffect, ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import Header from '@/app/ui/Header'

interface SidebarProps {
  isOpen: boolean
  onCloseAction: () => void
  title: string
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
    <div className="relative z-30">
      {/* Overlay to dim the background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onCloseAction}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full overflow-auto w-1/2 bg-white shadow-lg transform transition-transform z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-test="sidebar"
      >
        <Header title={title} onCloseAction={onCloseAction} />

        {/* Sidebar Content */}
        <div className="p-6 space-y-6 text-gray-800">{children}</div>
      </div>
    </div>
  )
}
