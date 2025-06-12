import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && 
          (Math.abs(scrollY - lastScrollY) > 10)) {
        setScrollDirection(direction)
      }
      
      setIsAtTop(scrollY < 10)
      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [lastScrollY, scrollDirection])

  return { scrollDirection, isAtTop }
} 