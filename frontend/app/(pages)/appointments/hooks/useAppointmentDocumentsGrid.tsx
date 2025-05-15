'use client'

import { useMemo } from 'react'
import { AppointmentDocument } from '@/app/lib/api/lavocat/types'
import {
  useDeleteAppointmentDocumentMutation,
  useGetAppointmentDocumentsQuery,
  usePatchAppointmentDocumentMutation,
} from '@/app/lib/api/lavocat/appointmentDocuments'
import { showErrorToast, showSuccessToast } from '@/app/utils/toast'
import { saveAs } from 'file-saver'
import { NewValueParams } from 'ag-grid-community'

export function useAppointmentDocumentsGrid(appointmentId: number) {
  const [patchDocument] = usePatchAppointmentDocumentMutation()
  const [deleteDocument] = useDeleteAppointmentDocumentMutation()

  const { data: appointmentDocuments } = useGetAppointmentDocumentsQuery(
    { appointmentId },
    { skip: !appointmentId }
  )

  const mutableDocuments = useMemo(
    () =>
      appointmentDocuments
        ? appointmentDocuments.map((document) => ({ ...document }))
        : [],
    [appointmentDocuments]
  )

  const handleDeleteFile = async (file: AppointmentDocument) => {
    try {
      await deleteDocument({ fileId: file.id }).unwrap()
      showSuccessToast(`Documento "${file.filename}" deletado`)
    } catch {
      showErrorToast('Erro ao excluir o arquivo')
    }
  }

  const handleDownloadFile = async (file: AppointmentDocument) => {
    if (!file?.file) {
      showErrorToast('URL do arquivo está ausente')
      return
    }

    try {
      const response = await fetch(file.file)
      if (!response.ok) throw new Error('Falha ao baixar o arquivo')
      showSuccessToast(`Baixando arquivo "${file.filename}"...`)

      const blob = await response.blob()
      saveAs(blob, file.filename || 'arquivo-baixado')
    } catch {
      showErrorToast('Erro ao baixar o arquivo')
    }
  }

  const handleEditFilename = async (params: NewValueParams) => {
    try {
      const { oldValue, colDef } = params
      const fileExtension = oldValue.substring(oldValue.lastIndexOf('.') + 1)

      if (!params.newValue.includes(`.${fileExtension}`)) {
        params.newValue = `${params.newValue}.${fileExtension}`
      }

      // Type assertion to ensure compatibility with computed property name
      const data = { [colDef.field as string]: params.newValue }

      await patchDocument({ appointmentId, documentId: params.data.id, data })
      showSuccessToast(`Nome do arquivo atualizado para "${params.newValue}"`)
    } catch (error) {
      console.error(`Erro ao renomear arquivo ${error}`)
      showErrorToast('Erro ao renomear arquivo')
    }
  }

  return {
    mutableDocuments,
    handleDeleteFile,
    handleDownloadFile,
    handleEditFilename,
  }
}
