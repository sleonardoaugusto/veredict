import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import {
  ArrowDownTrayIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { useAppointmentDocumentsGrid } from '@/app/(pages)/appointments/hooks/useAppointmentDocumentsGrid'
import { useEffect, useMemo } from 'react'

interface AppointmentDocumentsProps {
  appointmentId: number
  refreshKey: number
}

export default function AppointmentDocumentsGrid({
  appointmentId,
  refreshKey,
}: AppointmentDocumentsProps) {
  const {
    appointmentDocuments,
    refetchDocuments,
    handleDeleteFile,
    handleDownloadFile,
    handleEditFilename,
  } = useAppointmentDocumentsGrid(appointmentId)

  useEffect(() => {
    refetchDocuments()
  }, [refreshKey])

  const renderActions = (params: ICellRendererParams) => (
    <div className="flex items-center space-x-3">
      <button onClick={() => window.open(params.data.file, '_blank')}>
        <EyeIcon className="h-6 w-6 text-gray-700" />
      </button>

      <button onClick={() => handleDownloadFile(params.data)}>
        <ArrowDownTrayIcon className="h-6 w-6 text-gray-700" />
      </button>

      <button onClick={() => handleDeleteFile(params.data)}>
        <TrashIcon className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  )

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: 'Documento',
        field: 'filename',
        flex: 1,
        editable: true,
        onCellValueChanged: handleEditFilename,
      },
      {
        headerName: 'Ações',
        cellRenderer: renderActions,
        cellClass: 'flex items-center',
        width: 150,
      },
    ],
    []
  )

  return (
    <div data-test="documents-grid" className="ag-theme-alpine">
      <AgGridReact
        rowData={appointmentDocuments}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        getRowId={(params) => params.data.id.toString()}
      />
    </div>
  )
}
