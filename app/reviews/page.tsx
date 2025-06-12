"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface Review {
  id: number;
  listingId: number;
  listingTitle: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  image: string;
}

// Dummy data for demonstration
const dummyReviews: Review[] = [
  {
    id: 1,
    listingId: 1,
    listingTitle: "Luxury Beachfront Villa",
    location: "Cape Town, Western Cape",
    rating: 5,
    date: "2024-03-15",
    comment: "Amazing stay! The view was breathtaking and the amenities were top-notch. The host was very accommodating and made sure we had everything we needed.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    listingId: 2,
    listingTitle: "Mountain View Cottage",
    location: "Drakensberg, KwaZulu-Natal",
    rating: 4,
    date: "2024-03-10",
    comment: "Great location and very clean. The cottage had everything we needed for a comfortable stay. The views were spectacular!",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    listingId: 3,
    listingTitle: "City Center Apartment",
    location: "Johannesburg, Gauteng",
    rating: 5,
    date: "2024-03-05",
    comment: "Perfect location for exploring the city. The apartment was modern and well-equipped. Would definitely stay here again!",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
  },
]

export default function ReviewsPage() {
  const [reviews] = useState(dummyReviews)

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Your Reviews
        </h1>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-teal-500" />
          <span className="text-teal-500">{reviews.length} reviews</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="glass-card text-center py-12">
          <Star className="h-16 w-16 mx-auto text-teal-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
          <p className="text-muted-foreground mb-6">
            Start your journey and share your experiences
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
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Link href={`/listings/${review.listingId}`} className="hover:underline">
                      <h2 className="text-xl font-semibold text-white mb-2">{review.listingTitle}</h2>
                    </Link>
                    <div className="flex items-center text-teal-200/80 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{review.location}</span>
                    </div>
                    <div className="flex items-center text-teal-200/80">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-teal-500/20 px-3 py-1 rounded-full">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-teal-400 text-teal-400" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={review.image}
                      alt={review.listingTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-teal-200/80">{review.comment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
} 