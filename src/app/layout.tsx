import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Porcupine Facts | Learn About These Spiky Wonders',
  description: 'Discover fascinating facts about porcupines! Learn about their quills, habitat, behavior, and more interesting wildlife information.',
  keywords: 'porcupine, wildlife, facts, nature, animals, quills, mammals',
  authors: [{ name: 'Porcupine Facts Team' }],
  openGraph: {
    title: 'Porcupine Facts | Learn About These Spiky Wonders',
    description: 'Discover fascinating facts about porcupines and their amazing adaptations!',
    type: 'website',
    url: 'https://porcupine-website.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
