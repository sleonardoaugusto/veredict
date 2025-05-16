'use client' // prevent build error

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/lib/store'
import { ToastContainer } from 'react-toastify'
import { toastDefaultOptions } from '@/app/utils/toast'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ToastContainer {...toastDefaultOptions} />
      <Provider store={store}>{children}</Provider>
    </>
  )
}
