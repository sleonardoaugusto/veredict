import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/app/ui/fonts'
import ClientWrapper from '@/app/ClientWrapper'
import NavigationMenu from '@/app/ui/NavigationMenu'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Veredito',
  icons: [
    {
      url: '/veredito-icon.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.className} antialiased min-h-screen overflow-hidden`}
      >
        <div className="flex min-h-screen w-full bg-ag-grid-header-background-color">
          <NavigationMenu />
          <main className="flex-1 w-full overflow-y-auto">
            <ClientWrapper>{children}</ClientWrapper>
          </main>
        </div>
      </body>
    </html>
  )
}
