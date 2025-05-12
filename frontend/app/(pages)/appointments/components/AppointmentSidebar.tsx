'use client'

import React from 'react'
import { useGetNotesQuery } from '@/app/lib/api/lavocat/notes'
import AppointmentNote from '@/app/(pages)/appointments/components/AppointmentNote'
import { Appointment } from '@/app/lib/api/lavocat/types'
import AppointmentDocuments from '@/app/(pages)/appointments/components/AppointmentDocuments'
import AppointmentDetails from '@/app/(pages)/appointments/components/AppointmentDetails'
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
        title="Atendimento"
      >
        <AppointmentDetails appointment={appointment} />
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
