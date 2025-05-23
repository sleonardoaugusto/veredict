import React from 'react'
import AppointmentNotes from '@/app/(pages)/appointments/components/AppointmentNotes'
import type { Appointment } from '@/app/lib/api/lavocat/types'
import AppointmentDetails from '@/app/(pages)/appointments/components/AppointmentDetails'
import AppointmentDocuments from '@/app/(pages)/appointments/components/AppointmentDocuments'

interface AppointmentSidebarProps {
  appointment: Appointment | null
  setCreatedAppointmentAction?: (data: Appointment) => void
}

export default function AppointmentForm({
  appointment,
  setCreatedAppointmentAction,
}: AppointmentSidebarProps) {
  return (
    <>
      <AppointmentDetails
        appointment={appointment}
        onCreateAppointmentAction={setCreatedAppointmentAction}
      />
      {appointment && (
        <div className="flex flex-col gap-6">
          <AppointmentNotes appointmentId={appointment?.id} />
          <AppointmentDocuments appointmentId={appointment?.id} />
        </div>
      )}
    </>
  )
}
