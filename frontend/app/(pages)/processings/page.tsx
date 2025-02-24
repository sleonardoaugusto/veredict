'use client'

import React from 'react'
import { Form, Formik } from 'formik'
import {
  createProcessingImage,
  useCreateProcessingMutation,
} from '@/app/lib/api/lavocat/processing'

export default function FileUploadForm() {
  const [createProcessing] = useCreateProcessingMutation()
  const initialValues = {
    image: null,
  }

  const handleSubmit = async (values: any) => {
    const { id } = await createProcessing().unwrap()

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
