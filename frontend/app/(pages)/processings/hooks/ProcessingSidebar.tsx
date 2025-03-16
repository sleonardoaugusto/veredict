'use client'
import React from 'react'
import Sidebar from '@/app/ui/Sidebar'
import { Processing } from '@/app/lib/api/lavocat/types'
import ProcessingList from '@/app/(pages)/processings/ui/ProcessingList'

interface ProcessingSidebarProps {
  isOpen: boolean
  processing: Processing
  onCloseAction: () => void
}
export default function ProcessingSidebar({
  isOpen,
  onCloseAction,
  processing,
}: ProcessingSidebarProps) {
  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onCloseAction={onCloseAction}
        title="Detalhes do Processamento"
      >
        <ProcessingList processingId={processing.id} />
      </Sidebar>
    </>
  )
}
