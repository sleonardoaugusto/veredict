'use client'

import AppointmentDocumentsGrid from '@/app/(pages)/appointments/components/AppointmentDocumentsGrid'
import React from 'react'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import Spinner from '@/app/ui/Spinner'
import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'
import Button from '@/app/ui/Button'
import { uploadAppointmentDocument } from '@/app/lib/api/lavocat/appointmentDocuments'

interface AppointmentDocumentsProps {
  appointmentId: number
}

export default function AppointmentDocuments({
  appointmentId,
}: AppointmentDocumentsProps) {
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
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting, values, resetForm, submitForm }) => (
          <Form>
            <label
              htmlFor="file-upload"
              className={clsx(
                'inline-flex items-center gap-1 px-3 py-1 text-sm font-normal border rounded transition',
                isSubmitting
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 cursor-pointer'
              )}
            >
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
            </label>
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
      <AppointmentDocumentsGrid appointmentId={appointmentId} />
    </>
  )
}
