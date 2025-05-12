'use client'

import AppointmentsGrid from './components/AppointmentsGrid'
import Header from '@/app/ui/Header'
import React, { useState } from 'react'
import Button from '@/app/ui/Button'
import Sidebar from '@/app/ui/Sidebar'
import FileUploadForm from '@/app/(pages)/processings/components/FileUploadForm'
import AppointmentDetails from '@/app/(pages)/appointments/components/AppointmentDetails'

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
      <Sidebar
        isOpen={isOpen}
        onCloseAction={closeSidebar}
        title="Novo Atendimento"
      >
        <AppointmentDetails />
      </Sidebar>
      <AppointmentsGrid />
    </div>
  )
}
