'use client'
import React from 'react'
import Sidebar from '@/app/ui/Sidebar'
import { Processing } from '@/app/lib/api/lavocat/types'

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
        <div></div>
      </Sidebar>
    </>
  )
}
