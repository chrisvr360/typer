'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
]

const provinces = [
  {
    name: "Western Cape",
    slug: "western-cape",
    properties: [
      {
        id: 1,
        title: 'Beachfront Villa',
        location: 'Cape Town',
        price: 2500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 2,
        title: 'Mountain View Cottage',
        location: 'Stellenbosch',
        price: 1800,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Eastern Cape",
    slug: "eastern-cape",
    properties: [
      {
        id: 3,
        title: 'Beach House',
        location: 'Port Elizabeth',
        price: 2200,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 4,
        title: 'Coastal Retreat',
        location: 'East London',
        price: 1900,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Gauteng",
    slug: "gauteng",
    properties: [
      {
        id: 5,
        title: 'City Center Apartment',
        location: 'Johannesburg',
        price: 1200,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 6,
        title: 'Modern Loft',
        location: 'Pretoria',
        price: 1500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "KwaZulu-Natal",
    slug: "kwa-zulu-natal",
    properties: [
      {
        id: 7,
        title: 'Beach House',
        location: 'Durban',
        price: 2000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 8,
        title: 'Mountain Retreat',
        location: 'Drakensberg',
        price: 2200,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Limpopo",
    slug: "limpopo",
    properties: [
      {
        id: 9,
        title: 'Bushveld Lodge',
        location: 'Polokwane',
        price: 1800,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 10,
        title: 'Safari Villa',
        location: 'Tzaneen',
        price: 2500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Mpumalanga",
    slug: "mpumalanga",
    properties: [
      {
        id: 11,
        title: 'Panorama View',
        location: 'Nelspruit',
        price: 1700,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 12,
        title: 'Mountain Lodge',
        location: 'Sabie',
        price: 2100,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "North West",
    slug: "north-west",
    properties: [
      {
        id: 13,
        title: 'Game Farm House',
        location: 'Rustenburg',
        price: 1900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 14,
        title: 'Country Estate',
        location: 'Potchefstroom',
        price: 1600,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Free State",
    slug: "free-state",
    properties: [
      {
        id: 15,
        title: 'Farm Stay',
        location: 'Bloemfontein',
        price: 1400,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 16,
        title: 'Mountain View',
        location: 'Clarens',
        price: 1800,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    name: "Northern Cape",
    slug: "northern-cape",
    properties: [
      {
        id: 17,
        title: 'Desert Lodge',
        location: 'Upington',
        price: 1600,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: 18,
        title: 'River View',
        location: 'Kimberley',
        price: 1500,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      },
    ]
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Featured Properties Section */}
      <div>
        <div className="glass-card flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Featured Properties
          </h1>
          <Button variant="outline" className="hover:bg-teal-500/10">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <Link href={`/listings/${property.id}`} key={property.id}>
              <motion.div
                className="glass-card group overflow-hidden cursor-pointer"
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
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Province Sections */}
      {provinces.map((province) => (
        <div key={province.slug}>
          <div className="glass-card flex justify-between items-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              {province.name}
            </h2>
            <Link href={`/province/${province.slug}`}>
              <Button variant="outline" className="hover:bg-teal-500/10">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {province.properties.map((property) => (
              <Link href={`/listings/${property.id}`} key={property.id}>
                <motion.div
                  className="glass-card group overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}