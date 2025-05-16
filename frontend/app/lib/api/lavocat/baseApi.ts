import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { AuthService } from '@/app/lib/auth'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = AuthService.getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Optionally dispatch logout or redirect to login
    window.location.href = '/login'
    // Optionally: redirect or show a toast
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: [
    'Appointments',
    'AppointmentDetails',
    'AppointmentNotes',
    'AppointmentDocuments',
    'ProcessingImageMetadata',
  ],
})
