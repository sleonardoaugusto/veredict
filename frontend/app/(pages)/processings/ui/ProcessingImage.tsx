'use client'

import React, { useState } from 'react'
import Collapse from '@/app/ui/Collapase'
import { ProcessingImage as ProcessingImageType } from '@/app/lib/api/lavocat/types'
import Image from 'next/image'
import ProcessingImageForm from '@/app/(pages)/processings/ui/ProcessingImageForm'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/16/solid'

interface ProcessingImageProps {
  processingImage: ProcessingImageType
}

export default function ProcessingImage({
  processingImage,
}: ProcessingImageProps) {
  const [errorsAndWarningsFlags, setErrorsAndWarningsFlags] = useState<{
    errors: number
    warnings: number
  }>({ errors: 0, warnings: 0 })

  return (
    <Collapse
      key={processingImage.id}
      title={
        <div className="flex items-center gap-2">
          {errorsAndWarningsFlags.errors > 0 && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          )}
          {errorsAndWarningsFlags.warnings > 0 && (
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          )}
          <span>Processamento ({processingImage.id})</span>
        </div>
      }
    >
      <div className="flex flex-row gap-2">
        {processingImage.image && (
          <Image
            src={processingImage.image}
            width={500}
            height={500}
            alt="Foto do processamento"
          />
        )}
        <ProcessingImageForm
          processingImageId={processingImage.id}
          setErrorsAndWarningsAction={setErrorsAndWarningsFlags}
        />
      </div>
    </Collapse>
  )
}
