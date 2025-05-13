'use client'

import { AgGridReact } from 'ag-grid-react'
import {
  AllCommunityModule,
  ModuleRegistry,
  RowClickedEvent,
} from 'ag-grid-community'
import AppointmentSidebar from '@/app/(pages)/appointments/components/AppointmentSidebar'
import { useState } from 'react'
import { useAppointmentsGrid } from '@/app/(pages)/appointments/hooks/useAppointmentsGrid'
import { Appointment } from '@/app/lib/api/lavocat/types'

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

  if (isLoading) return <p>Loading appointments...</p>
  if (error) return <p>Error loading appointments. Please try again later.</p>

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
      {selectedRow && (
        <AppointmentSidebar
          isOpen={sidebarOpen}
          title="Editar Atendimento"
          appointment={selectedRow}
          onCloseAction={closeSidebar}
        />
      )}
    </div>
  )
}
