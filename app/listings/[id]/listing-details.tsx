"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Coffee, Utensils, Tv, Wind, ChevronLeft, ChevronRight } from 'lucide-react'

interface Review {
  user: string
  rating: number
  date: string
  comment: string
}

interface Amenity {
  name: string
}

interface Listing {
  id: number
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  description: string
  amenities: Amenity[]
  images: string[]
  host: {
    name: string
    avatar: string
    joined: string
    responseTime: string
  }
  details: {
    bedrooms: number
    bathrooms: number
    maxGuests: number
  }
  reviews: Review[]
}

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-5 w-5" />,
  "Free Parking": <Car className="h-5 w-5" />,
  "Coffee Maker": <Coffee className="h-5 w-5" />,
  "Kitchen": <Utensils className="h-5 w-5" />,
  "Smart TV": <Tv className="h-5 w-5" />,
  "Air Conditioning": <Wind className="h-5 w-5" />,
}

export function ListingDetails({ listing }: { listing: Listing }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date())

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src={listing.images[selectedImage]}
          alt={listing.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full text-white hover:bg-teal-500/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full text-white hover:bg-teal-500/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {listing.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                selectedImage === index ? 'bg-teal-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center text-teal-200/80">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{listing.location}</span>
                </div>
              </div>
              <div className="flex items-center bg-teal-500/20 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-teal-400 text-teal-400 mr-1" />
                <span className="font-semibold text-white">{listing.rating}</span>
                <span className="text-teal-200/80 ml-1">
                  ({listing.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Hosted by {listing.host.name}</h3>
                  <p className="text-sm text-teal-200/80">
                    Joined in {listing.host.joined}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="glass-card text-teal-500 hover:bg-teal-500/10">
                Contact Host
              </Button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4 text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                <span className="text-white">{listing.details.bedrooms} bedrooms</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                <span className="text-white">{listing.details.bathrooms} bathrooms</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                <span className="text-white">Up to {listing.details.maxGuests} guests</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-4">About this place</h2>
              <p className="text-teal-200/80">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {amenityIcons[amenity.name]}
                    <span className="text-teal-200/80">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {listing.reviews.length} Reviews
            </h2>
            <div className="space-y-6">
              {listing.reviews.map((review, index) => (
                <div key={index} className="border-b border-teal-500/20 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{review.user}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-teal-400 text-teal-400 mr-1" />
                      <span className="text-teal-200/80">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-teal-200/60 mb-2">{review.date}</p>
                  <p className="text-teal-200/80">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-2xl font-bold text-white">R{listing.price}</span>
                <span className="text-teal-200/80"> / night</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-teal-400 text-teal-400 mr-1" />
                <span className="text-teal-200/80">{listing.rating}</span>
                <span className="text-teal-200/60 ml-1">
                  ({listing.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-teal-200/80 mb-1">
                    Check-in
                  </label>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-200/80 mb-1">
                    Check-out
                  </label>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    className="rounded-md border"
                  />
                </div>
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                Reserve
              </Button>

              <p className="text-center text-sm text-teal-200/60">
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 