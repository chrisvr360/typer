"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

// Dummy data for demonstration
const dummyFavorites: Listing[] = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Cape Town, Western Cape",
    price: 2500,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Mountain View Cottage",
    location: "Drakensberg, KwaZulu-Natal",
    price: 1800,
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "City Center Apartment",
    location: "Johannesburg, Gauteng",
    price: 1200,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
  },
]

export default function FavoritesPage() {
  const [favorites] = useState(dummyFavorites)

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Your Favorites
        </h1>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-teal-500" />
          <span className="text-teal-500">{favorites.length} saved</span>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="glass-card text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-teal-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Start exploring and save your favorite properties
          </p>
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-6 py-2 rounded-full text-teal-500 hover:bg-teal-500/10"
            >
              Explore Properties
            </motion.div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((listing: Listing) => (
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