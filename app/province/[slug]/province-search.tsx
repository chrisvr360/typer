"use client"

import { useState } from 'react'

export function ProvinceSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search properties..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="glass px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
      />
    </div>
  )
} 