'use client'
import React from 'react'
import Sidebar from '@/app/ui/Sidebar'
import { Processing } from '@/app/lib/api/lavocat/types'
import ProcessingList from '@/app/(pages)/processings/ui/ProcessingList'
import { downloadTokens } from '@/app/lib/api/lavocat/processings'

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
        <button
          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border border-gray-300 rounded hover:bg-gray-200 transition"
          onClick={() => downloadTokens({ processingId: processing.id })}
        >
          Baixar Tokens
        </button>
        <ProcessingList processingId={processing.id} />
      </Sidebar>
    </>
  )
}
