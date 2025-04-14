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
    image: [] as File[],
  }

  const handleSubmit = async (values: { image: File[] }) => {
    if (!values.image || values.image.length === 0) {
      console.error('No files selected!')
      return
    }

    const { id } = await createProcessing().unwrap()

    for (const file of values.image) {
      await createProcessingImage({
        processingId: id,
        image: file,
      })
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <input
              type="file"
              multiple
              onChange={(event) => {
                const files = event.currentTarget.files
                if (files) {
                  setFieldValue('image', Array.from(files))
                }
              }}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
