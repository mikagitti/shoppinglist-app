
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Your shoppin list: check and edit.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
