import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/app/ui/fonts'
import ClientWrapper from '@/app/ClientWrapper'
import NavigationMenu from '@/app/ui/NavigationMenu'

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
        <div className="flex min-h-screen w-full">
          <NavigationMenu />
          <main className="flex-1 w-full overflow-x-hidden">
            <ClientWrapper>{children}</ClientWrapper>
          </main>
        </div>
      </body>
    </html>
  )
}
