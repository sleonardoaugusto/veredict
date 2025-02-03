import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { AppointmentDocument } from '@/app/lib/api/lavocat/types'

export const appointmentDocumentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentDocuments: builder.query<
      AppointmentDocument[],
      { appointmentId: number }
    >({
      query: ({ appointmentId }) => `/attendances/${appointmentId}/documents/`,
      providesTags: ['AppointmentDocuments'],
    }),
    patchAppointmentDocument: builder.mutation<
      Partial<AppointmentDocument>,
      {
        appointmentId: number
        documentId: number
        data: Partial<AppointmentDocument>
      }
    >({
      query: ({ appointmentId, documentId, data }) => ({
        url: `/attendances/${appointmentId}/documents/${documentId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AppointmentDocuments'],
    }),
    deleteAppointmentDocument: builder.mutation<void, { fileId: number }>({
      query: ({ fileId }) => ({
        method: 'DELETE',
        url: `/attendance-files/${fileId}/`,
      }),
      invalidatesTags: ['AppointmentDocuments'],
    }),
  }),
})

export const {
  useGetAppointmentDocumentsQuery,
  usePatchAppointmentDocumentMutation,
  useDeleteAppointmentDocumentMutation,
} = appointmentDocumentsApi
