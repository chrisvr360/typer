import React from 'react'
import { ProvinceSearch } from '@/app/province/[slug]/province-search'
import { ListingCard } from '@/app/province/[slug]/listing-card'

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

export default async function ProvincePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const currentSlug = resolvedParams.slug as ProvinceSlug;
  const provinceListings = dummyListings[currentSlug] || []

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          {provinceNames[currentSlug]} Properties
        </h1>
        <ProvinceSearch />
      </div>

      {provinceListings.length === 0 ? (
        <div className="glass-card text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No properties found</h2>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provinceListings.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
} 