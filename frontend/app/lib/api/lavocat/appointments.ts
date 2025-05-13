import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { Appointment } from '@/app/lib/api/lavocat/types'

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/attendances/',
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation<
      Appointment,
      { data: Partial<Appointment> }
    >({
      query: ({ data }) => ({
        url: `/attendances/`,
        method: 'POST',
        body: data,
      }),
    }),
    patchAppointment: builder.mutation<
      Appointment,
      { appointmentId: number; data: Partial<Appointment> }
    >({
      query: ({ appointmentId, data }) => ({
        url: `/attendances/${appointmentId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AppointmentNotes'],
    }),
  }),
})

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  usePatchAppointmentMutation,
} = appointmentsApi
