'use client'

import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import {
  createProcessingImage,
  useCreateProcessingMutation,
} from '@/app/lib/api/lavocat/processings'
import Button from '@/app/ui/Button'
import { ArrowUpTrayIcon, CheckIcon } from '@heroicons/react/16/solid'
import Spinner from '@/app/ui/Spinner'
import clsx from 'clsx'
import FileUploadLabel from '@/app/ui/FileUploadLabel'

export default function FileUploadForm({ isOpen }: { isOpen: boolean }) {
  const [filesUploaded, setFilesUploaded] = useState<boolean>(false)
  const [createProcessing] = useCreateProcessingMutation()

  const initialValues = {
    image: [] as File[],
  }

  const handleSubmit = async (
    values: { image: File[] },
    { setSubmitting }: { setSubmitting: (flag: boolean) => void }
  ) => {
    if (!values.image || values.image.length === 0) {
      console.error('No files selected!')
      return
    }

    setSubmitting(true)

    try {
      const { id } = await createProcessing().unwrap()

      await Promise.all(
        values.image.map((file) =>
          createProcessingImage({
            processingId: id,
            image: file,
          })
        )
      )
      setFilesUploaded(true)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting, values, resetForm }) => {
        React.useEffect(() => {
          if (!isOpen) {
            resetForm()
            setFilesUploaded(false)
          }
        }, [isOpen])

        return (
          <Form>
            <div className="space-y-2">
              {/* Upload (File Picker) */}
              <FileUploadLabel
                htmlFor="file-upload"
                isSubmitting={isSubmitting || filesUploaded}
              >
                Selecionar Imagens
              </FileUploadLabel>

              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                disabled={isSubmitting || filesUploaded}
                onChange={(event) => {
                  const files = event.currentTarget.files
                  if (files) {
                    setFieldValue('image', Array.from(files))
                  }
                }}
              />

              {/* File Summary */}
              {values.image?.length > 0 && (
                <div className="text-sm text-gray-700">
                  <p>{values.image.length} imagem(ns) selecionada(s)</p>

                  <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-600 text-xs max-h-32 overflow-auto">
                    {values.image.slice(0, 5).map((file: File, idx: number) => (
                      <li key={idx} className="truncate">
                        {file.name}
                      </li>
                    ))}
                    {values.image.length > 5 && (
                      <li>+ {values.image.length - 5} mais</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit */}
            {values.image?.length > 0 && (
              <div className="mt-4">
                {filesUploaded && (
                  <div className="my-3 rounded border border-green-100 bg-green-50 p-3 text-green-700 text-sm flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <CheckIcon className="w-4 h-4 text-green-600" />
                      Imagens enviadas com sucesso!
                    </div>
                    <div className="text-green-600 text-xs">
                      Processamento em andamento...
                    </div>
                  </div>
                )}
                <Button type="submit" disabled={filesUploaded}>
                  {isSubmitting ? (
                    <>
                      Enviando...
                      <Spinner />
                    </>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="w-4 h-4" />
                      Enviar Imagens
                    </>
                  )}
                </Button>
              </div>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}
