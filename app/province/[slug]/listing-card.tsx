"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Listing {
  _id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing._id}`}>
      <motion.div
        className="glass-card group overflow-hidden cursor-pointer"
      >
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={listing.images[0] || '/placeholder.jpg'}
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
  )
} 