// app/listings/[id]/page.tsx
import React from 'react'
import { ListingDetails } from './listing-details'

type PageParams = Promise<{ id: string }>

const listings = {
  "1": {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Cape Town, South Africa",
    coordinates: {
      lat: -33.9249,
      lng: 18.4241
    },
    price: 2500,
    rating: 4.9,
    reviewCount: 128,
    description: "Experience the ultimate luxury in this stunning beachfront villa. With panoramic ocean views, private pool, and modern amenities, this is the perfect getaway for those seeking both comfort and adventure.",
    amenities: [
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Coffee Maker" },
      { name: "Kitchen" },
      { name: "Smart TV" },
      { name: "Air Conditioning" }
    ],
    images: [
      "/images/villa1.jpg",
      "/images/villa2.jpg",
      "/images/villa3.jpg",
      "/images/villa4.jpg"
    ],
    host: {
      name: "Sarah Johnson",
      avatar: "/images/host1.jpg",
      joined: "2018",
      responseTime: "within an hour"
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8
    },
    reviews: [
      {
        user: "Michael Brown",
        rating: 5,
        date: "March 2024",
        comment: "Absolutely amazing stay! The views were breathtaking and the amenities were top-notch."
      },
      {
        user: "Emma Wilson",
        rating: 4.8,
        date: "February 2024",
        comment: "Beautiful property with everything you need. The host was very responsive and helpful."
      }
    ]
  },
  "2": {
    id: 2,
    title: "Mountain View Cabin",
    location: "Drakensberg, South Africa",
    coordinates: {
      lat: -29.2333,
      lng: 29.4500
    },
    price: 1800,
    rating: 4.7,
    reviewCount: 95,
    description: "Escape to this cozy mountain cabin surrounded by nature. Perfect for hiking enthusiasts and those looking for a peaceful retreat with stunning mountain views.",
    amenities: [
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Coffee Maker" },
      { name: "Kitchen" },
      { name: "Smart TV" },
      { name: "Air Conditioning" }
    ],
    images: [
      "/images/cabin1.jpg",
      "/images/cabin2.jpg",
      "/images/cabin3.jpg",
      "/images/cabin4.jpg"
    ],
    host: {
      name: "David Smith",
      avatar: "/images/host2.jpg",
      joined: "2019",
      responseTime: "within 2 hours"
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6
    },
    reviews: [
      {
        user: "Lisa Anderson",
        rating: 4.9,
        date: "March 2024",
        comment: "The cabin was perfect for our family getaway. The views were spectacular!"
      },
      {
        user: "John Davis",
        rating: 4.6,
        date: "February 2024",
        comment: "Great location for hiking and enjoying nature. The cabin was very comfortable."
      }
    ]
  }
}

export default async function ListingPage({ params }: { params: PageParams }) {
  // Next.js 15 now makes `params` a Promise, so we have to await it:
  const { id } = await params
  const listing = listings[id as keyof typeof listings]

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Listing Not Found</h1>
          <p className="text-teal-200/80">The listing you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return <ListingDetails listing={listing} />
}
