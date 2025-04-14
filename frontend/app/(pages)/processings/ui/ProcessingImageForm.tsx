'use client'

import React, { useEffect } from 'react'
import {
  useGetProcessingImageMetadataQuery,
  usePatchProcessingImageMetadataMutation,
} from '@/app/lib/api/lavocat/processings'
import { Field, Form, Formik } from 'formik'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'
import { InputField } from '@/app/ui/InputField'

interface ProcessingImageFormProps {
  processingImageId: number
  setErrorsAndWarningsAction: (obj: {
    errors: number
    warnings: number
  }) => void
}

interface FormValues {
  ocr_code_1: string
  date_1: string
  city_1: string
  ocr_code_2: string
  date_2: string
  city_2: string
  ocr_code_3: string
  date_3: string
  city_3: string
}

export default function ProcessingImageForm({
  processingImageId,
  setErrorsAndWarningsAction,
}: ProcessingImageFormProps) {
  const { data: imageMetadata } = useGetProcessingImageMetadataQuery(
    { processingImageId },
    { skip: !processingImageId }
  )

  const [patchProcessingImage] = usePatchProcessingImageMetadataMutation()

  useEffect(() => {
    calculateErrorsAndWarnings()
  }, [imageMetadata])

  function calculateErrorsAndWarnings() {
    let result = { errors: 0, warnings: 0 }

    if (!imageMetadata) return result

    for (const [key, value] of Object.entries(imageMetadata)) {
      if (key.endsWith('_flag')) {
        if (value === 'error') result.errors++
        if (value === 'warning') result.warnings++
      }
    }

    setErrorsAndWarningsAction(result)
  }

  function getBorderColor(
    status: 'error' | 'warning' | null | undefined
  ): string {
    if (status === 'error') return 'border-red-500'
    if (status === 'warning') return 'border-yellow-500'
    return ''
  }

  const handleSubmit = async (values: FormValues) => {
    return await makeRequest(
      () => patchProcessingImage({ processingImageId, data: values }),
      'Dados salvos',
      'Um erro ocorreu'
    )
  }

  const initialValues = {
    ocr_code_1: imageMetadata?.ocr_code_1 || '',
    date_1: imageMetadata?.date_1 || '',
    city_1: imageMetadata?.city_1 || '',
    ocr_code_2: imageMetadata?.ocr_code_2 || '',
    date_2: imageMetadata?.date_2 || '',
    city_2: imageMetadata?.city_2 || '',
    ocr_code_3: imageMetadata?.ocr_code_3 || '',
    date_3: imageMetadata?.date_3 || '',
    city_3: imageMetadata?.city_3 || '',
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, values }) => (
        <Form className="flex flex-col justify-between">
          <InputField
            name="ocr_code_1"
            placeholder="Código"
            className={getBorderColor(imageMetadata?.ocr_code_1_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="date_1"
            placeholder="Data"
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="city_1"
            placeholder="Cidade"
            className={getBorderColor(imageMetadata?.city_1_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="ocr_code_2"
            placeholder="Código"
            className={getBorderColor(imageMetadata?.ocr_code_2_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="date_2"
            placeholder="Data"
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="city_2"
            placeholder="Cidade"
            className={getBorderColor(imageMetadata?.city_2_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="ocr_code_3"
            placeholder="Código"
            className={getBorderColor(imageMetadata?.ocr_code_3_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="date_3"
            placeholder="Data"
            onBlur={() => {
              handleSubmit()
            }}
          />
          <InputField
            name="city_3"
            placeholder="Cidade"
            className={getBorderColor(imageMetadata?.city_3_flag)}
            onBlur={() => {
              handleSubmit()
            }}
          />
        </Form>
      )}
    </Formik>
  )
}
