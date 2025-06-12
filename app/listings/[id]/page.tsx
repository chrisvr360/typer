"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Coffee, Utensils, Tv, Wind, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Review {
  user: string
  rating: number
  date: string
  comment: string
}

interface Amenity {
  icon: React.ReactNode
  name: string
}

// Dummy data for demonstration
const dummyListing = {
  id: 1,
  title: "Luxury Beachfront Villa",
  location: "Cape Town, Western Cape",
  price: 2500,
  rating: 4.9,
  reviewCount: 128,
  description: "Experience the ultimate luxury in this stunning beachfront villa. Enjoy breathtaking ocean views, private pool, and modern amenities.",
  amenities: [
    { icon: <Wifi className="h-5 w-5" />, name: "Free WiFi" },
    { icon: <Car className="h-5 w-5" />, name: "Free Parking" },
    { icon: <Coffee className="h-5 w-5" />, name: "Coffee Maker" },
    { icon: <Utensils className="h-5 w-5" />, name: "Kitchen" },
    { icon: <Tv className="h-5 w-5" />, name: "Smart TV" },
    { icon: <Wind className="h-5 w-5" />, name: "Air Conditioning" },
  ] as Amenity[],
  images: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60",
  ],
  host: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    joined: "2020",
    responseTime: "within an hour",
  },
  details: {
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
  },
  reviews: [
    {
      user: "Michael B.",
      rating: 5,
      date: "2024-03-15",
      comment: "Amazing stay! The view was breathtaking and the amenities were top-notch.",
    },
    {
      user: "Lisa K.",
      rating: 4,
      date: "2024-03-10",
      comment: "Great location and very clean. Would definitely recommend!",
    },
  ] as Review[],
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date())

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % dummyListing.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + dummyListing.images.length) % dummyListing.images.length)
  }

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src={dummyListing.images[selectedImage]}
          alt={dummyListing.title}
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
          {dummyListing.images.map((_, index) => (
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
                  {dummyListing.title}
                </h1>
                <div className="flex items-center text-teal-200/80">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{dummyListing.location}</span>
                </div>
              </div>
              <div className="flex items-center bg-teal-500/20 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-teal-400 text-teal-400 mr-1" />
                <span className="font-semibold text-white">{dummyListing.rating}</span>
                <span className="text-teal-200/80 ml-1">
                  ({dummyListing.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={dummyListing.host.avatar}
                    alt={dummyListing.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Hosted by {dummyListing.host.name}</h3>
                  <p className="text-sm text-teal-200/80">
                    Joined in {dummyListing.host.joined}
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
                <span className="text-white">{dummyListing.details.bedrooms} bedrooms</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                <span className="text-white">{dummyListing.details.bathrooms} bathrooms</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                <span className="text-white">Up to {dummyListing.details.maxGuests} guests</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-4">About this place</h2>
              <p className="text-teal-200/80">{dummyListing.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dummyListing.amenities.map((amenity, index) => (
                  <div key={index} className="glass-card p-3 flex items-center">
                    <span className="text-teal-500 mr-2">{amenity.icon}</span>
                    <span className="text-white">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Reviews</h2>
              <div className="space-y-6">
                {dummyListing.reviews.map((review, index) => (
                  <div key={index} className="glass-card p-4">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-white mr-2">{review.user}</span>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-teal-400 text-teal-400" />
                        ))}
                      </div>
                      <span className="text-sm text-teal-200/80 ml-2">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-teal-200/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="glass-card sticky top-8">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  R{dummyListing.price.toLocaleString()} <span className="text-lg font-normal text-teal-200/80">/ night</span>
                </h2>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-teal-400 text-teal-400 mr-1" />
                  <span className="text-white">{dummyListing.rating}</span>
                  <span className="text-teal-200/80 ml-1">
                    ({dummyListing.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Check-in</label>
                    <div className="glass p-4 rounded-lg">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        className="p-0"
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label: "text-white font-semibold",
                          nav: "space-x-1 flex items-center",
                          nav_button: "glass-card p-2 rounded-full text-white opacity-70 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex",
                          head_cell: "text-teal-200/80 rounded-md w-9 font-normal text-[0.8rem]",
                          row: "flex w-full mt-2",
                          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/10 rounded-md",
                          day_selected: "bg-teal-500/20 text-white rounded-md",
                          day_today: "bg-white/20 text-white rounded-md",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_range_middle: "",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Check-out</label>
                    <div className="glass p-4 rounded-lg">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        className="p-0"
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label: "text-white font-semibold",
                          nav: "space-x-1 flex items-center",
                          nav_button: "glass-card p-2 rounded-full text-white opacity-70 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex",
                          head_cell: "text-teal-200/80 rounded-md w-9 font-normal text-[0.8rem]",
                          row: "flex w-full mt-2",
                          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/10 rounded-md",
                          day_selected: "bg-teal-500/20 text-white rounded-md",
                          day_today: "bg-white/20 text-white rounded-md",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_range_middle: "",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full glass-card text-teal-500 hover:bg-teal-500/10">
                  Reserve
                </Button>
                <p className="text-center text-sm text-teal-200/80">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 