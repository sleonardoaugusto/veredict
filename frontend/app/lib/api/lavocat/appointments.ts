import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import type { Appointment } from '@/app/lib/api/lavocat/types'

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/v1/attendances/',
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation<
      Appointment,
      { data: Partial<Appointment> }
    >({
      query: ({ data }) => ({
        url: `/v1/attendances/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointments'],
    }),
    patchAppointment: builder.mutation<
      Appointment,
      { appointmentId: number; data: Partial<Appointment> }
    >({
      query: ({ appointmentId, data }) => ({
        url: `/v1/attendances/${appointmentId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AppointmentNotes', 'Appointments'],
    }),
  }),
})

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  usePatchAppointmentMutation,
} = appointmentsApi
