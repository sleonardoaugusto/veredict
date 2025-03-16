'use client'

import React from 'react'
import { useGetProcessingImageMetadataQuery } from '@/app/lib/api/lavocat/processings'
import { Field, Form, Formik } from 'formik'

interface ProcessingImageFormProps {
  processingImageId: number
}

export default function ProcessingImageForm({
  processingImageId,
}: ProcessingImageFormProps) {
  const { data: imageMetadata } = useGetProcessingImageMetadataQuery(
    { processingImageId },
    { skip: !processingImageId }
  )

  const initialValues = {
    ocr_code_1: imageMetadata?.ocr_code_1 || '',
  }
  console.log(initialValues, 'initialValues ###')
  const handleSubmit = (values) => {
    console.log(values, 'values ###')
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <Form>
          <Field
            name="ocr_code_1"
            placeholder="Código"
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            onBlur={() => {
              handleSubmit()
            }}
          />
        </Form>
      )}
    </Formik>
  )
}
