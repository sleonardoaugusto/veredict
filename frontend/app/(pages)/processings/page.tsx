'use client'

import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useProcessingsGrid } from '@/app/(pages)/processings/hooks/useProcessingsGrid'
import {
  AllCommunityModule,
  ModuleRegistry,
  RowClickedEvent,
} from 'ag-grid-community'
import ProcessingSidebar from '@/app/(pages)/processings/hooks/ProcessingSidebar'
import { Processing } from '@/app/lib/api/lavocat/types'
ModuleRegistry.registerModules([AllCommunityModule])

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Processing | null>(null)

  const { processings, columnDefs } = useProcessingsGrid()

  const onRowClicked = (params: RowClickedEvent) => {
    setSelectedRow(params.data)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setSelectedRow(null)
  }

  return (
    <>
      <div className="p-4 flex justify-between items-center bg-sky-100 text-gray-900">
        <h1 className="text-xl font-semibold">Processamentos</h1>
      </div>
      <div
        className="ag-theme-alpine pt-4"
        style={{ width: '100%', height: '100vh' }}
        data-test="processings-grid"
      >
        <AgGridReact
          rowData={processings}
          columnDefs={columnDefs}
          onRowClicked={onRowClicked}
        />
        {selectedRow && (
          <ProcessingSidebar
            isOpen={sidebarOpen}
            processing={selectedRow}
            onCloseAction={closeSidebar}
          />
        )}
      </div>
    </>
  )
}
