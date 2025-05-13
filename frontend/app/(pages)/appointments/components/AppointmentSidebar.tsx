'use client'

import React, { useState } from 'react'
import { useGetNotesQuery } from '@/app/lib/api/lavocat/notes'
import AppointmentNote from '@/app/(pages)/appointments/components/AppointmentNote'
import { Appointment } from '@/app/lib/api/lavocat/types'
import AppointmentDocuments from '@/app/(pages)/appointments/components/AppointmentDocuments'
import AppointmentDetails from '@/app/(pages)/appointments/components/AppointmentDetails'
import Sidebar from '@/app/ui/Sidebar'
import { skipToken } from '@reduxjs/toolkit/query'

interface AppointmentSidebarProps {
  isOpen: boolean
  onCloseAction: () => void
  title: string
  appointment: Appointment | null
  setCreatedAppointmentAction?: (data: Appointment) => void
}

export default function AppointmentSidebar({
  isOpen,
  onCloseAction,
  title,
  appointment,
  setCreatedAppointmentAction,
}: AppointmentSidebarProps) {
  const { data: appointmentNotes } = useGetNotesQuery(
    appointment?.id ? { appointmentId: appointment.id } : skipToken
  )

  return (
    <>
      <Sidebar isOpen={isOpen} onCloseAction={onCloseAction} title={title}>
        <AppointmentDetails
          appointment={appointment}
          onCreateAppointmentAction={setCreatedAppointmentAction}
        />
        {appointment && (
          <div className="flex flex-col gap-6">
            {appointmentNotes?.map((note) => (
              <AppointmentNote
                key={note.id}
                appointmentId={appointment?.id}
                note={note}
              />
            ))}
            <AppointmentDocuments appointmentId={appointment?.id} />
          </div>
        )}
      </Sidebar>
    </>
  )
}
