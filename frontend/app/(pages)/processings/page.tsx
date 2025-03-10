'use client'

import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useProcessingsGrid } from '@/app/(pages)/processings/hooks/useProcessingsGrid'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

export default function Page() {
  const { processings, columnDefs } = useProcessingsGrid()

  return (
    <>
      <div className="p-4 flex justify-between items-center bg-sky-100 text-gray-900">
        <h1 className="text-xl font-semibold">Processamentos</h1>
      </div>
      <div
        className="ag-theme-alpine pt-4"
        style={{ width: '100%', height: '100vh' }}
      >
        <AgGridReact rowData={processings} columnDefs={columnDefs} />
      </div>
    </>
  )
}
