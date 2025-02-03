import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4OTgzMDAxLCJqdGkiOiIwYWEzNzdlZTMzZTg0Zjg5YTFjZjFkNzk4MjNlYmQ5NiIsInVzZXJfaWQiOjF9.8PccIqqu6HVFRQC8-RT017bupjVCqXPpzsuSK8TV_ZY'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['AppointmentDocuments'],
})
