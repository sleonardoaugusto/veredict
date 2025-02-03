'use client'

import { Note } from '@/app/lib/api/lavocat/types'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { usePatchNoteMutation } from '@/app/lib/api/lavocat/notes'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'

interface NoteProps {
  appointmentId: number
  note: Note
}

interface FormValues {
  content: string
}

export default function AppointmentNote({ appointmentId, note }: NoteProps) {
  const [patchNote] = usePatchNoteMutation()

  const initialValues: FormValues = {
    content: note?.content || '',
  }

  const countRows = (str: string): number => {
    if (!str) return 0

    return str?.split('\n')?.length - 1
  }

  const handleSubmit = async (values: FormValues) => {
    return await makeRequest(
      () =>
        patchNote({
          appointmentId,
          noteId: note.id,
          data: values,
        }),
      'Nota salva',
      'Um erro ocorreu'
    )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <Form>
          <div
            key={note.id}
            className="border p-4 rounded-md shadow-sm bg-gray-100"
          >
            <h3 className="font-semibold text-lg mb-2">{note.header}</h3>
            <Field
              as="textarea"
              name="content"
              placeholder="Enter content here..."
              rows={countRows(note.content) + 3}
              className="w-full border border-gray-300 rounded-md p-2 resize-none"
              onBlur={() => {
                handleSubmit()
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
