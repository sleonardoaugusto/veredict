'use client'

import type { Note } from '@/app/lib/api/lavocat/types'
import { Form, Formik } from 'formik'
import React from 'react'
import {
  useGetNotesQuery,
  usePatchNoteMutation,
} from '@/app/lib/api/lavocat/notes'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'
import { InputField } from '@/app/ui/InputField'

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
      'Nota Atualizada.',
      'Um inesperado erro ocorreu.'
    )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <Form>
          <div
            key={note.id}
            className="border border-[#CBD5E1] p-4 rounded-md shadow-sm bg-[#F9FAFB]"
            data-test="note"
          >
            <h3 className="font-semibold text-[#1E2A38] text-lg mb-2">
              {note.header}
            </h3>

            <InputField
              as="textarea"
              name="content"
              placeholder="Insira o conteúdo aqui..."
              rows={countRows(note.content) + 3}
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
