'use client'

import React, { useState } from 'react'
import Sidebar from '@/app/ui/Sidebar'
import FileUploadForm from '@/app/(pages)/processings/ui/FileUploadForm'

export default function ProcessingImagesButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function closeSidebar() {
    setIsOpen(false)
  }

  return (
    <>
      <button className="btn btn-sm join-item" onClick={() => setIsOpen(true)}>
        Processar Imagens
      </button>
      <Sidebar
        isOpen={isOpen}
        onCloseAction={closeSidebar}
        title="Processar Imagens"
      >
        <FileUploadForm />
      </Sidebar>
    </>
  )
}
