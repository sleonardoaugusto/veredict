import { AgGridReact } from 'ag-grid-react'
import type { RowClickedEvent } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import AppointmentForm from '@/app/(pages)/appointments/components/AppointmentForm'
import React, { useState } from 'react'
import { useAppointmentsGrid } from '@/app/(pages)/appointments/hooks/useAppointmentsGrid'
import type { Appointment } from '@/app/lib/api/lavocat/types'
import Sidebar from '@/app/ui/Sidebar'

ModuleRegistry.registerModules([AllCommunityModule])

export default function AppointmentsGrid() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Appointment | null>(null)

  const { mutableAppointments, isLoading, error, columnDefs } =
    useAppointmentsGrid()

  const onRowClicked = (params: RowClickedEvent) => {
    setSelectedRow(params.data)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setSelectedRow(null)
  }

  if (isLoading) return <p>Carregando atendimentos...</p>
  if (error) return <p>Erro ao carregar atendimentos.</p>

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: '100%', height: '100vh' }}
      data-test="appointments-grid"
    >
      <AgGridReact
        gridOptions={{
          rowSelection: {
            mode: 'singleRow',
            checkboxes: false,
            enableClickSelection: true,
          },
        }}
        rowData={mutableAppointments}
        columnDefs={columnDefs}
        onRowClicked={onRowClicked}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onCloseAction={closeSidebar}
        title="Editar Atendimento"
      >
        <AppointmentForm appointment={selectedRow} />
      </Sidebar>
    </div>
  )
}
