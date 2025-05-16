import { baseApi } from '@/app/lib/api/lavocat/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.mutation<
      { access: string; refresh: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `/v1/token/`,
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
})

export const { useAuthenticateMutation } = authApi
