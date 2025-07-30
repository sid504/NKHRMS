'use client'

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
      
      // Measure page load time
      if (typeof window !== 'undefined') {
        const startTime = performance.now()
        
        const handleLoad = () => {
          const endTime = performance.now()
          const loadTimeMs = endTime - startTime
          setLoadTime(loadTimeMs)
        }

        if (document.readyState === 'complete') {
          handleLoad()
        } else {
          window.addEventListener('load', handleLoad)
          return () => window.removeEventListener('load', handleLoad)
        }
      }
    }
  }, [])

  if (!isVisible || loadTime === null) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-xs z-50">
      <div>Load Time: {loadTime.toFixed(0)}ms</div>
      <div className="text-green-400">
        {loadTime < 1000 ? 'Fast' : loadTime < 2000 ? 'Good' : 'Slow'}
      </div>
    </div>
  )
} 