'use client'

import React from 'react'
import { useGetNotesQuery } from '@/app/lib/api/lavocat/notes'
import AppointmentNote from '@/app/(pages)/appointments/ui/AppointmentNote'
import { Appointment } from '@/app/lib/api/lavocat/types'
import AppointmentDocuments from '@/app/(pages)/appointments/components/AppointmentDocuments'
import CustomerDetails from '@/app/(pages)/appointments/components/CustomerDetails'
import Sidebar from '@/app/ui/Sidebar'

interface AppointmentSidebarProps {
  isOpen: boolean
  appointment: Appointment
  onCloseAction: () => void
}

export default function AppointmentSidebar({
  isOpen,
  appointment,
  onCloseAction,
}: AppointmentSidebarProps) {
  const { data: appointmentNotes } = useGetNotesQuery(
    { appointmentId: appointment?.id },
    { skip: !appointment?.id }
  )

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onCloseAction={onCloseAction}
        title="Appointment Details"
      >
        <CustomerDetails appointment={appointment} />
        {appointmentNotes?.map((note) => (
          <AppointmentNote
            key={note.id}
            appointmentId={appointment?.id}
            note={note}
          />
        ))}
        <AppointmentDocuments appointmentId={appointment?.id} />
      </Sidebar>
    </>
  )
}
