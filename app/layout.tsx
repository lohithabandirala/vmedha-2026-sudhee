import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans'
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});
const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'OpenSys | Vive Le Tech',
  description: 'Long live tech - Building the future with innovation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased bg-[#080B1F] text-[#E6E9FF]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
