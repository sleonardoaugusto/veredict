'use client'

import React, { useState } from 'react'
import Sidebar from '@/app/ui/Sidebar'
import FileUploadForm from '@/app/(pages)/processings/ui/FileUploadForm'
import Button from '@/app/ui/Button'

export default function ProcessingImagesButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function closeSidebar() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        className="mt-2 btn btn-sm join-item"
        onClick={() => setIsOpen(true)}
      >
        Processar Imagens
      </Button>
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
