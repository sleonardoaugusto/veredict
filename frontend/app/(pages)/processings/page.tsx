'use client'

import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useProcessingsGrid } from '@/app/(pages)/processings/hooks/useProcessingsGrid'
import type {
  RowClickedEvent} from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry
} from 'ag-grid-community'
import ProcessingSidebar from '@/app/(pages)/processings/hooks/ProcessingSidebar'
import type { Processing } from '@/app/lib/api/lavocat/types'
import ProcessingImagesButton from '@/app/(pages)/processings/components/ProcessingImagesButton'
import Header from '@/app/ui/Header'
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
      <Header title="Processamentos" />
      <div className="relative ag-theme-alpine" data-test="processings-grid">
        <ProcessingImagesButton />
        <div
          className="relative z-0"
          style={{ width: '100%', height: '100vh' }}
        >
          <AgGridReact
            rowData={processings}
            columnDefs={columnDefs}
            onRowClicked={onRowClicked}
          />
        </div>
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
