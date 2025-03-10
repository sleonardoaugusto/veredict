'use client'

import React from 'react'
import { Form, Formik } from 'formik'
import {
  createProcessingImage,
  useCreateProcessingMutation,
} from '@/app/lib/api/lavocat/processings'

export default function FileUploadForm() {
  const [createProcessing] = useCreateProcessingMutation()
  const initialValues = {
    image: null,
  }

  const handleSubmit = async (values: { image: File | null }) => {
    const { id } = await createProcessing().unwrap()

    if (!values.image) {
      console.error('Image is empty!')
      return
    }

    await createProcessingImage({
      processingId: id,
      image: values.image,
    })
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting, errors, touched }) => (
        <Form>
          <div>
            <input
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setFieldValue('image', event.currentTarget.files[0])
                }
              }}
            />
            {errors.image && touched.image && (
              <p style={{ color: 'red' }}>{errors.image}</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
