import { Note } from '@/app/lib/api/lavocat/types'
import { baseApi } from '@/app/lib/api/lavocat/baseApi'

export const notesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], { appointmentId: number }>({
      query: ({ appointmentId }) => `/attendances/${appointmentId}/notes/`,
    }),
    patchNote: builder.mutation<
      Partial<Note>,
      { appointmentId: number; noteId: number; data: Partial<Note> }
    >({
      query: ({ appointmentId, noteId, data }) => ({
        url: `/attendances/${appointmentId}/notes/${noteId}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
})

export const { useGetNotesQuery, usePatchNoteMutation } = notesApi
