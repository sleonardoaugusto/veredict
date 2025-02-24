'use client'
import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { Appointment } from '@/app/lib/api/lavocat/types'
import { AuthService } from '@/app/lib/auth'

export const processingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProcessing: builder.mutation<{ id: number }, void>({
      query: () => ({
        url: '/processings/',
        method: 'POST',
      }),
    }),
  }),
})

export const createProcessingImage = async ({
  processingId,
  image,
}: {
  processingId: number
  image: File
}) => {
  const formData = new FormData()
  formData.append('image', image)

  try {
    const token = AuthService.getToken()

    if (token == null) return

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/processings/${processingId}/images/`,
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
export const { useCreateProcessingMutation } = processingsApi
