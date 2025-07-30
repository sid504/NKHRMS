import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Layout from './layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NKHR - AI-Powered HR Management Platform',
  description: 'Next-Generation AI-Powered HR Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 