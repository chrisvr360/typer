import Link from 'next/link'
import { Home, Mountain, Umbrella, Tent, Building2, Ship } from 'lucide-react'

const categories = [
  { name: 'Houses', icon: Home, href: '/category/houses' },
  { name: 'Mountain View', icon: Mountain, href: '/category/mountain-view' },
  { name: 'Beachfront', icon: Umbrella, href: '/category/beachfront' },
  { name: 'Camping', icon: Tent, href: '/category/camping' },
  { name: 'Apartments', icon: Building2, href: '/category/apartments' },
  { name: 'Luxury', icon: Ship, href: '/category/luxury' },
]

export function CategoryNav() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center space-y-1 min-w-[80px]"
            >
              <category.icon className="h-6 w-6" />
              <span className="text-sm">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 