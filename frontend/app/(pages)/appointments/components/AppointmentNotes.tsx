'use client'

import { Note } from '@/app/lib/api/lavocat/types'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import {
  useGetNotesQuery,
  usePatchNoteMutation,
} from '@/app/lib/api/lavocat/notes'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'

interface NoteProps {
  appointmentId: number
  note: Note
}

interface FormValues {
  content: string
}

function AppointmentNote({ appointmentId, note }: NoteProps) {
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
            data-test="note"
          >
            <h3 className="font-semibold text-lg mb-2">{note.header}</h3>
            <Field
              as="textarea"
              name="content"
              placeholder="Insira o conteúdo aqui..."
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

export default function AppointmentNotes({
  appointmentId,
}: {
  appointmentId: number
}) {
  const { data: appointmentNotes } = useGetNotesQuery(
    { appointmentId },
    { skip: !appointmentId }
  )

  return (
    <>
      {appointmentNotes?.map((note) => (
        <AppointmentNote
          key={note.id}
          appointmentId={appointmentId}
          note={note}
        />
      ))}
    </>
  )
}
