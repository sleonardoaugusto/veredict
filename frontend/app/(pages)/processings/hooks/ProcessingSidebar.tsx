'use client'

import React from 'react'
import Sidebar from '@/app/ui/Sidebar'
import type { Processing } from '@/app/lib/api/lavocat/types'
import ProcessingList from '@/app/(pages)/processings/components/ProcessingList'
import { downloadTokens } from '@/app/lib/api/lavocat/processings'
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid'
import Button from '@/app/ui/Button'

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
        <Button
          onClickAction={() => downloadTokens({ processingId: processing.id })}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Baixar Tokens
        </Button>
        <ProcessingList processingId={processing.id} />
      </Sidebar>
    </>
  )
}
