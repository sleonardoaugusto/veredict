'use client'

import AppointmentsGrid from './components/AppointmentsGrid'
import Header from '@/app/ui/Header'
import React, { useState } from 'react'
import Button from '@/app/ui/Button'
import AppointmentSidebar from '@/app/(pages)/appointments/components/AppointmentSidebar'
import { Appointment } from '@/app/lib/api/lavocat/types'

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [createdAppointment, setCreatedAppointment] =
    useState<Appointment | null>(null)

  function closeSidebar() {
    setIsOpen(false)
  }

  return (
    <div>
      <Header title="Atendimentos" />
      <Button
        className="mt-4 mb-2 btn btn-sm join-item"
        onClick={() => setIsOpen(true)}
      >
        Novo Atendimento
      </Button>
      <AppointmentSidebar
        isOpen={isOpen}
        onCloseAction={closeSidebar}
        title="Criar Atendimento"
        appointment={createdAppointment}
        setCreatedAppointmentAction={setCreatedAppointment}
      />
      <AppointmentsGrid />
    </div>
  )
}
