import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components-layout'
import PerformanceMonitor from './components/PerformanceMonitor'

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
      <body>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
          <Toaster position="top-right" />
          <PerformanceMonitor />
        </AuthProvider>
      </body>
    </html>
  )
}
