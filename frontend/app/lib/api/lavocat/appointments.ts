import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { Appointment } from '@/app/lib/api/lavocat/types'

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/attendances/',
      providesTags: ['AppointmentDetails'],
    }),
    patchAppointment: builder.mutation<
      Partial<Appointment>,
      { appointmentId: number; data: Partial<Appointment> }
    >({
      query: ({ appointmentId, data }) => ({
        url: `/attendances/${appointmentId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AppointmentDetails', 'AppointmentNotes'],
    }),
  }),
})

export const { useGetAppointmentsQuery, usePatchAppointmentMutation } =
  appointmentsApi
