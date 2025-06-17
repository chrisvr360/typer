'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { toast } from 'sonner';

interface Property {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  owner: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ProvincePage({ params }: { params: { province: string } }) {
  const router = useRouter();
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/listings?category=${params.province}`);
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        toast.error('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [params.province, fetchListings]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings...</div>
      </div>
    );
  }

  const provinceName = params.province
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{provinceName} Listings</h1>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">No listings found in {provinceName}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard
              key={listing._id}
              property={listing}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
} 