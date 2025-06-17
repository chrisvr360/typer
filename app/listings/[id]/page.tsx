// app/listings/[id]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ListingDetails } from './listing-details';
import { toast } from 'sonner';

interface Listing {
  id: number;
  title: string;
  location: string;
    coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  amenities: { name: string }[];
  images: string[];
    host: {
    name: string;
    avatar: string;
    joined: string;
    responseTime: string;
  };
    details: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
  };
  reviews: {
    user: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export default function ListingPage() {
  const params = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchListing = useCallback(async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        // Transform the data to match the expected format
        const transformedListing = {
          id: parseInt(data._id), // Convert MongoDB _id to number
          title: data.title,
          location: data.location,
    coordinates: {
            lat: -33.9249, // Default coordinates for now
            lng: 18.4241
    },
          price: data.price,
          rating: data.rating || 0,
          reviewCount: 0, // Default review count
          description: data.description,
          amenities: data.amenities.map((amenity: string) => ({ name: amenity })),
          images: data.images,
    host: {
            name: `${data.owner.firstName} ${data.owner.lastName}`,
            avatar: '/placeholder-avatar.jpg',
            joined: '2024',
            responseTime: 'within an hour'
    },
    details: {
            bedrooms: 2, // Default values
            bathrooms: 1,
            maxGuests: 4
    },
          reviews: [] // Empty reviews array
        };
        setListing(transformedListing);
      } else {
        toast.error('Failed to fetch listing');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listing...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Listing Not Found</h1>
          <p className="text-teal-200/80">The listing you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return <ListingDetails listing={listing} />;
}
