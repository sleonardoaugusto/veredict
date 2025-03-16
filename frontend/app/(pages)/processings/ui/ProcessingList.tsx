'use client'

import React from 'react'
import { useGetProcessingImagesQuery } from '@/app/lib/api/lavocat/processings'
import ProcessingImage from '@/app/(pages)/processings/ui/ProcessingImage'

interface ProcessingListProps {
  processingId: number
}
export default function ProcessingList({ processingId }: ProcessingListProps) {
  const { data: processingImages } = useGetProcessingImagesQuery(
    { processingId },
    { skip: !processingId }
  )
  return processingImages?.map((processingImage) => (
    <ProcessingImage
      key={processingImage.id}
      processingImage={processingImage}
    />
  ))
}
