'use client'

import React from 'react'
import Collapse from '@/app/ui/Collapase'
import { ProcessingImage as ProcessingImageType } from '@/app/lib/api/lavocat/types'
import Image from 'next/image'
import ProcessingImageForm from '@/app/(pages)/processings/ui/ProcessingImageForm'

interface ProcessingImageProps {
  processingImage: ProcessingImageType
}

export default function ProcessingImage({
  processingImage,
}: ProcessingImageProps) {
  return (
    <Collapse key={processingImage.id} title="Processamento">
      <div className="flex flex-row gap-2">
        <Image
          src={processingImage.image}
          width={500}
          height={500}
          alt="Foto do processamento"
        />
        <ProcessingImageForm processingImageId={processingImage.id} />
      </div>
    </Collapse>
  )
}
