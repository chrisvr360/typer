"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

interface PropertyMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  title: string
}

// Dynamically import the map component with no SSR
const Map = dynamic(
  () => import('./Map').then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] rounded-lg overflow-hidden bg-gray-800 animate-pulse" />
    ),
  }
)

export function PropertyMap({ coordinates, title }: PropertyMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Location</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <Map coordinates={coordinates} title={title} />
      </div>
    </div>
  )
} 