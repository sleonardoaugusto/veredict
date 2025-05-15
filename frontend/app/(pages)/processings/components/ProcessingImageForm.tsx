'use client'

import React, { useEffect } from 'react'
import {
  useGetProcessingImageMetadataQuery,
  usePatchProcessingImageMetadataMutation,
} from '@/app/lib/api/lavocat/processings'
import { Form, Formik } from 'formik'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'
import { InputField } from '@/app/ui/InputField'
import { ProcessingImageMetadata } from '@/app/lib/api/lavocat/types'

interface ProcessingImageFormProps {
  processingImageId: number
  setErrorsAndWarningsAction: (obj: {
    errors: number
    warnings: number
  }) => void
}

interface ImageMetadataFormProps {
  processingImageId: number
  imageMetadata: ProcessingImageMetadata
  refetchImageMetadata: () => void
}

interface FormValues {
  ocr_code: string
  date: string
  city: string
}

export default function ProcessingImageForm({
  processingImageId,
  setErrorsAndWarningsAction,
}: ProcessingImageFormProps) {
  const { data: imageMetadata, refetch: refetchImageMetadata } =
    useGetProcessingImageMetadataQuery(
      { processingImageId },
      { skip: !processingImageId }
    )

  useEffect(() => {
    const result = { errors: 0, warnings: 0 }

    if (!imageMetadata) return

    imageMetadata.map((metadata) => {
      for (const [key, value] of Object.entries(metadata)) {
        if (key.endsWith('_flag')) {
          if (value === 'error') result.errors++
          if (value === 'warning') result.warnings++
        }
      }
    })

    setErrorsAndWarningsAction(result)
  }, [imageMetadata, setErrorsAndWarningsAction])

  const topMetadata =
    imageMetadata?.filter((metadata) => metadata.position === 'top') || []
  const middleMetadata =
    imageMetadata?.filter((metadata) => metadata.position === 'middle') || []
  const bottomMetadata =
    imageMetadata?.filter((metadata) => metadata.position === 'bottom') || []

  function ImageMetadataForm({
    processingImageId,
    imageMetadata,
    refetchImageMetadata,
  }: ImageMetadataFormProps) {
    const [patchProcessingImageMetadata] =
      usePatchProcessingImageMetadataMutation()

    function getBorderColor(
      status: 'error' | 'warning' | null | undefined
    ): string {
      if (status === 'error') return 'border-red-500'
      if (status === 'warning') return 'border-yellow-500'
      return ''
    }

    const handleSubmit = async (values: FormValues) => {
      const response = await makeRequest(
        () =>
          patchProcessingImageMetadata({
            processingImageId,
            imageMetadataId: imageMetadata.id,
            data: values,
          }),
        'Dados Atualizados.',
        'Um inesperado erro ocorreu.'
      )

      if (response) {
        refetchImageMetadata()
      }

      return response
    }

    const initialValues = {
      ocr_code: imageMetadata?.ocr_code || '',
      date: imageMetadata?.date || '',
      city: imageMetadata?.city || '',
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleSubmit }) => (
          <Form className="flex flex-col gap-10">
            <InputField
              name="ocr_code"
              placeholder="Código"
              className={getBorderColor(imageMetadata?.ocr_code_flag)}
              onBlur={() => {
                handleSubmit()
              }}
            />
            <InputField
              name="date"
              placeholder="Data"
              className={getBorderColor(imageMetadata?.date_flag)}
              onBlur={() => {
                handleSubmit()
              }}
            />
            <InputField
              name="city"
              placeholder="Cidade"
              className={getBorderColor(imageMetadata?.city_flag)}
              onBlur={() => {
                handleSubmit()
              }}
            />
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {topMetadata.map((metadata) => (
        <ImageMetadataForm
          key={metadata.id}
          processingImageId={processingImageId}
          imageMetadata={metadata}
          refetchImageMetadata={refetchImageMetadata}
        />
      ))}

      {middleMetadata.map((metadata) => (
        <ImageMetadataForm
          key={metadata.id}
          processingImageId={processingImageId}
          imageMetadata={metadata}
          refetchImageMetadata={refetchImageMetadata}
        />
      ))}

      {bottomMetadata.map((metadata) => (
        <ImageMetadataForm
          key={metadata.id}
          processingImageId={processingImageId}
          imageMetadata={metadata}
          refetchImageMetadata={refetchImageMetadata}
        />
      ))}
    </div>
  )
}
