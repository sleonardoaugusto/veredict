import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { Appointment } from '@/app/lib/api/lavocat/types'

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/attendances/',
    }),
    patchAppointment: builder.mutation<
      Partial<Appointment>,
      { id: number; data: Partial<Appointment> }
    >({
      query: ({ id, data }) => ({
        url: `/attendances/${id}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
})

export const { useGetAppointmentsQuery, usePatchAppointmentMutation } =
  appointmentsApi
