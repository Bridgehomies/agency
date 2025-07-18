import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bridge Homies',
  description: 'Building Digital Bridges',
  icons: {
    icon: 'logo-bg.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
