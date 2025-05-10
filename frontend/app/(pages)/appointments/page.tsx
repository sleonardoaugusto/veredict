import AppointmentsGrid from './components/AppointmentsGrid'
import Header from '@/app/ui/Header'
import React from 'react'

export default async function Page() {
  return (
    <div>
      <Header title="Atendimentos" />
      <AppointmentsGrid />
    </div>
  )
}
