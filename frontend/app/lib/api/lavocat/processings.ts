import { saveAs } from 'file-saver'
import { baseApi } from '@/app/lib/api/lavocat/baseApi'
import { AuthService } from '@/app/lib/auth'
import type {
  Processing,
  ProcessingImage,
  ProcessingImageMetadata,
} from '@/app/lib/api/lavocat/types'

export const processingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessings: builder.query<Processing[], void>({
      query: () => '/v1/processings/',
      providesTags: ['Processings'],
    }),
    createProcessing: builder.mutation<{ id: number }, void>({
      query: () => ({
        url: '/v1/processings/',
        method: 'POST',
      }),
      invalidatesTags: ['Processings'],
    }),
    getProcessingImages: builder.query<
      ProcessingImage[],
      { processingId: number }
    >({
      query: ({ processingId }) =>
        `/v1/processings/${processingId}/processing-images/`,
    }),
    getProcessingImageMetadata: builder.query<
      ProcessingImageMetadata[],
      { processingImageId: number }
    >({
      query: ({ processingImageId }) =>
        `/v1/processing-images/${processingImageId}/metadata/`,
      providesTags: ['ProcessingImageMetadata'],
    }),
    patchProcessingImageMetadata: builder.mutation<
      Partial<ProcessingImageMetadata>,
      {
        processingImageId: number
        imageMetadataId: number
        data: Partial<ProcessingImageMetadata>
      }
    >({
      query: ({ processingImageId, imageMetadataId, data }) => ({
        url: `/v1/processing-images/${processingImageId}/metadata/${imageMetadataId}/`,
        method: 'PATCH',
        body: data,
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/processings/${processingId}/processing-images/`,
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

export const downloadTokens = async ({
  processingId,
}: {
  processingId: number
}) => {
  const token = AuthService.getToken()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/processings/${processingId}/tokens/`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to download file.')
  }

  const blob = await response.blob()

  saveAs(blob, 'tokens.txt')
}

export const {
  useGetProcessingsQuery,
  useGetProcessingImagesQuery,
  useGetProcessingImageMetadataQuery,
  useCreateProcessingMutation,
  usePatchProcessingImageMetadataMutation,
} = processingsApi
