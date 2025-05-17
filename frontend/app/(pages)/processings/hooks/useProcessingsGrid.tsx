import { useGetProcessingsQuery } from '@/app/lib/api/lavocat/processings'
import type { ColDef } from 'ag-grid-community'

export function useProcessingsGrid() {
  const { data: processings, isLoading, error } = useGetProcessingsQuery()
  const columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      editable: false,
    },
    {
      headerName: 'Data',
      field: 'created_at',
    },
  ]

  return {
    processings,
    isLoading,
    error,
    columnDefs,
  }
}
