'use client'

import AppointmentsGrid from './components/AppointmentsGrid'
import Header from '@/app/ui/Header'
import React, { useState } from 'react'
import Button from '@/app/ui/Button'
import AppointmentForm from '@/app/(pages)/appointments/components/AppointmentForm'
import { Appointment } from '@/app/lib/api/lavocat/types'
import Sidebar from '@/app/ui/Sidebar'

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [createdAppointment, setCreatedAppointment] =
    useState<Appointment | null>(null)

  function closeSidebar() {
    setIsOpen(false)
  }

  const sidebarTitle = createdAppointment
    ? 'Editar Atendimento'
    : 'Criar Atendimento'

  return (
    <div>
      <Header title="Atendimentos" />
      <Button
        className="mt-4 mb-2 btn btn-sm join-item"
        onClick={() => setIsOpen(true)}
      >
        Novo Atendimento
      </Button>
      <Sidebar
        isOpen={isOpen}
        onCloseAction={closeSidebar}
        title={sidebarTitle}
      >
        <AppointmentForm
          appointment={createdAppointment}
          setCreatedAppointmentAction={setCreatedAppointment}
        />
      </Sidebar>
      <AppointmentsGrid />
    </div>
  )
}
