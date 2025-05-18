'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Button from '@/app/ui/Button'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surface text-foreground flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          A página que você está procurando não existe.
        </p>
        <Button
          onClick={() => router.push('/appointments')}
          className="px-4 py-2 bg-accent text-surface rounded hover:opacity-90 transition"
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  )
}
