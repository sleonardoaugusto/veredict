'use client'

import AppointmentDocumentsGrid from '@/app/(pages)/appointments/components/AppointmentDocumentsGrid'
import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import Spinner from '@/app/ui/Spinner'
import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'
import { uploadAppointmentDocument } from '@/app/lib/api/lavocat/appointmentDocuments'
import FileUploadLabel from '@/app/ui/FileUploadLabel'

interface AppointmentDocumentsProps {
  appointmentId: number
}

export default function AppointmentDocuments({
  appointmentId,
}: AppointmentDocumentsProps) {
  const [refreshKey, setRefreshKey] = useState<number>(0)
  const initialValues = { files: [] }

  const handleSubmit = async (
    values: { files: File[] },
    { setSubmitting }: { setSubmitting: (flag: boolean) => void }
  ) => {
    if (!values.files || values.files.length === 0) {
      console.error('No files selected!')
      return
    }

    setSubmitting(true)

    try {
      await Promise.all(
        values.files.map((file) =>
          uploadAppointmentDocument(file, appointmentId)
        )
      )
      setRefreshKey((prev) => prev + 1)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting, submitForm }) => (
          <Form>
            <FileUploadLabel htmlFor="file-upload">
              {isSubmitting ? (
                <>
                  Enviando...
                  <Spinner />
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-4 h-4" />
                  Enviar Documentos
                </>
              )}
            </FileUploadLabel>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              disabled={isSubmitting}
              onChange={async (event) => {
                const files = event.currentTarget.files
                if (files) {
                  await setFieldValue('files', Array.from(files))
                  submitForm()
                }
              }}
            />
          </Form>
        )}
      </Formik>
      <AppointmentDocumentsGrid
        appointmentId={appointmentId}
        refreshKey={refreshKey}
      />
    </>
  )
}
