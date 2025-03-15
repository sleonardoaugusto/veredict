import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/app/ui/fonts'
import ClientWrapper from '@/app/ClientWrapper'

export const metadata: Metadata = {
  title: 'Veredito',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
