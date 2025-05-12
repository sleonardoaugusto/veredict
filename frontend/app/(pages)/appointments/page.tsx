'use client'

import AppointmentsGrid from './components/AppointmentsGrid'
import Header from '@/app/ui/Header'
import React from 'react'
import Button from '@/app/ui/Button'

export default function Page() {
  return (
    <div>
      <Header title="Atendimentos" />
      <Button className="mt-4 mb-2 btn btn-sm join-item" onClick={() => {}}>
        Novo Atendimento
      </Button>
      <AppointmentsGrid />
    </div>
  )
}
