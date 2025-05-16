import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import type { AppointmentDocument } from '@/app/lib/api/lavocat/types'
import { AuthService } from '@/app/lib/auth'

export const appointmentDocumentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentDocuments: builder.query<
      AppointmentDocument[],
      { appointmentId: number }
    >({
      query: ({ appointmentId }) =>
        `/v1/attendances/${appointmentId}/documents/`,
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
        url: `/v1/attendances/${appointmentId}/documents/${documentId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AppointmentDocuments'],
    }),
    deleteAppointmentDocument: builder.mutation<void, { fileId: number }>({
      query: ({ fileId }) => ({
        method: 'DELETE',
        url: `/v1/attendance-files/${fileId}/`,
      }),
      invalidatesTags: ['AppointmentDocuments'],
    }),
  }),
})

export const uploadAppointmentDocument = async (
  file: File,
  processingId: number
) => {
  const formData = new FormData()
  formData.append('attendance', processingId.toString())
  formData.append('file', file)
  formData.append('filename', file.name)

  try {
    const token = AuthService.getToken()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/attendance-files/`,
      {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`)
    }

    return await response.json() // ✅ Parse JSON response
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export const {
  useGetAppointmentDocumentsQuery,
  usePatchAppointmentDocumentMutation,
  useDeleteAppointmentDocumentMutation,
} = appointmentDocumentsApi
