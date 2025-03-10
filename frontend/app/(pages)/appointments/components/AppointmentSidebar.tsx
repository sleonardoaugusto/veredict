'use client'

import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { useGetNotesQuery } from '@/app/lib/api/lavocat/notes'
import AppointmentNote from '@/app/(pages)/appointments/ui/AppointmentNote'
import { Appointment } from '@/app/lib/api/lavocat/types'
import AppointmentDocuments from '@/app/(pages)/appointments/components/AppointmentDocuments'
import CustomerDetails from '@/app/(pages)/appointments/components/CustomerDetails'

interface SidebarProps {
  isOpen: boolean
  appointment: Appointment
  onCloseAction: () => void
}

export default function Sidebar({
  isOpen,
  appointment,
  onCloseAction,
}: SidebarProps) {
  const {
    data: appointmentNotes,
    isLoading,
    error,
  } = useGetNotesQuery(
    { appointmentId: appointment?.id },
    { skip: !appointment?.id }
  )

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

  if (isLoading) return <p>Loading appointment details...</p>
  if (error)
    return <p>Error loading appointment details. Please try again later.</p>

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
          <h2 className="text-lg font-semibold">
            {appointment?.customer_name}
          </h2>
          <button onClick={onCloseAction} className="hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="max-full p-6 space-y-6">
          <CustomerDetails appointment={appointment} />
          {appointmentNotes?.map((note) => (
            <AppointmentNote
              key={note.id}
              appointmentId={appointment?.id}
              note={note}
            />
          ))}
          <AppointmentDocuments appointmentId={appointment?.id} />
        </div>
      </div>
    </>
  )
}
