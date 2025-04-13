import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthService } from '@/app/lib/auth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = AuthService.getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['AppointmentDocuments', 'ProcessingImageMetadata'],
})
