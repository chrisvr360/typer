"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Star, Heart, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

type ProvinceSlug = 'eastern-cape' | 'western-cape' | 'northern-cape' | 'free-state' | 'kwa-zulu-natal' | 'gauteng' | 'limpopo' | 'mpumalanga' | 'north-west';

const provinceNames: Record<ProvinceSlug, string> = {
  'eastern-cape': 'Eastern Cape',
  'western-cape': 'Western Cape',
  'northern-cape': 'Northern Cape',
  'free-state': 'Free State',
  'kwa-zulu-natal': 'KwaZulu-Natal',
  'gauteng': 'Gauteng',
  'limpopo': 'Limpopo',
  'mpumalanga': 'Mpumalanga',
  'north-west': 'North West',
};

const dummyListings: Record<ProvinceSlug, Listing[]> = {
  'eastern-cape': [
    {
      id: 1,
      title: 'Beachfront Villa',
      location: 'Port Elizabeth',
      price: 2500,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
      description: 'Luxurious beachfront villa with stunning ocean views',
    },
  ],
  'western-cape': [
    {
      id: 2,
      title: 'Mountain View Cottage',
      location: 'Cape Town',
      price: 1800,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      description: 'Cozy cottage with panoramic mountain views',
    },
  ],
  'northern-cape': [],
  'free-state': [],
  'kwa-zulu-natal': [],
  'gauteng': [],
  'limpopo': [],
  'mpumalanga': [],
  'north-west': [],
};

export default function ProvincePage({ params }: { params: { slug: string } }) {
  const [searchQuery, setSearchQuery] = useState('')
  const currentSlug = params.slug as ProvinceSlug;

  const provinceListings = dummyListings[currentSlug] || []
  const filteredListings = provinceListings.filter((listing: Listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          {provinceNames[currentSlug]} Properties
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="glass-card text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No properties found</h2>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing: Listing) => (
            <Link href={`/listings/${listing.id}`} key={listing.id}>
              <motion.div
                className="glass-card group overflow-hidden cursor-pointer"
              >
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{listing.title}</h3>
                      <p className="text-sm text-teal-200/80">{listing.location}</p>
                    </div>
                    <div className="flex items-center bg-teal-500/20 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-teal-400 text-teal-400" />
                      <span className="ml-1 text-sm text-teal-200">{listing.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-white">
                      R{listing.price.toLocaleString()} <span className="text-sm font-normal text-teal-200/80">/ night</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 