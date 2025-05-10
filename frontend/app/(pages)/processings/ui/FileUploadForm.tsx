'use client'

import React from 'react'
import { Form, Formik } from 'formik'
import {
  createProcessingImage,
  useCreateProcessingMutation,
} from '@/app/lib/api/lavocat/processings'
import Button from '@/app/ui/Button'
import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'

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

    Promise.all(
      values.image.map((file) =>
        createProcessingImage({
          processingId: id,
          image: file,
        })
      )
    ).then(() => {})
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
          <Button type="submit">
            {isSubmitting ? (
              <>
                Enviado...
                <div className="w-4 h-4 border-2 border-t-transparent border-indigo-700 rounded-full animate-spin" />
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="w-4 h-4" />
                Enviar Imagens
              </>
            )}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
