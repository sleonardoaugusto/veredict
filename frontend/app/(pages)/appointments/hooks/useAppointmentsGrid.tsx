'use client'

import { ColDef } from 'ag-grid-community'
import { useMemo } from 'react'
import { useGetAppointmentsQuery } from '@/app/lib/api/lavocat/appointments'

export function useAppointmentsGrid() {
  const { data: appointments, isLoading, error } = useGetAppointmentsQuery()

  const mutableAppointments = useMemo(
    () =>
      appointments
        ? appointments.map((appointment) => ({ ...appointment }))
        : [],
    [appointments]
  )

  const serviceTypes: Record<string, string> = {
    DPVAT: 'DPVAT',
    AUXILIO_DOENCA: 'Auxílio Doença',
    AUXILIO_ACIDENTE: 'Auxílio Acidente',
    LOAS: 'LOAS',
    APOSENTADORIA: 'Aposentadoria',
    ACAO_INDENIZATORIA: 'Ação Indenizatória',
    ACAO_TRABALHISTA: 'Ação Trabalhista',
    ACAO_PREVIDENCIARIA: 'Ação Previdenciária',
    SEGURO_DE_VIDA_PROPRIO: 'Seguro de Vida Próprio',
    SEGURO_CONDUTOR: 'Seguro Condutor',
    SEGURO_DE_VIDA_EMPRESARIAL: 'Seguro de Vida Empresarial',
    SEGURO_DE_VIDA_NO_BANCO: 'Seguro de Vida no Banco',
    PENSAO_POR_MORTE: 'Pensão por Morte',
  }

  const columnDefs: ColDef[] = [
    {
      headerName: '#',
      valueGetter: (params) =>
        params?.node?.rowIndex !== null && params?.node?.rowIndex !== undefined
          ? params.node.rowIndex + 1
          : '',
      width: 50,
    },
    { headerName: 'ID', field: 'id', editable: false },
    { headerName: 'Nome', field: 'customer_name', editable: true },
    {
      headerName: 'Serviços',
      field: 'services_types',
      valueFormatter: (params) => {
        const services = params.value || []
        return services
          .map((service: string) => serviceTypes[service] || service)
          .join(', ')
      },
      editable: false,
    },
  ]

  return {
    mutableAppointments,
    isLoading,
    error,
    columnDefs,
  }
}
