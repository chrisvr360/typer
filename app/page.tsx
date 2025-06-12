'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'

// Temporary mock data - will be replaced with MongoDB data
const properties = [
  {
    id: 1,
    title: 'Luxury Beach House',
    location: 'Cape Town',
    price: 2500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Mountain View Villa',
    location: 'Johannesburg',
    price: 1800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
  },
  // Add more properties as needed
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Featured Properties
        </h1>
        <Button variant="outline" className="hover:bg-teal-500/10">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="glass-card group overflow-hidden"
          >
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-white">{property.title}</h3>
                  <p className="text-sm text-teal-200/80">{property.location}</p>
                </div>
                <div className="flex items-center bg-teal-500/20 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-teal-400 text-teal-400" />
                  <span className="ml-1 text-sm text-teal-200">{property.rating}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-white">
                  R{property.price.toLocaleString()} <span className="text-sm font-normal text-teal-200/80">/ night</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}