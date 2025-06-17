// app/province/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProvinceSearch } from '@/app/province/[slug]/province-search';
import { ListingCard } from '@/app/province/[slug]/listing-card';
import { toast } from 'sonner';

interface Listing {
  _id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

type ProvinceSlug =
  | 'eastern-cape'
  | 'western-cape'
  | 'northern-cape'
  | 'free-state'
  | 'kwa-zulu-natal'
  | 'gauteng'
  | 'limpopo'
  | 'mpumalanga'
  | 'north-west';

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

export default function ProvincePage() {
  const params = useParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/listings?category=${params.slug}`);
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
    if (params.slug) {
      fetchListings();
    }
  }, [params.slug, fetchListings]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings...</div>
      </div>
    );
  }

  const provinceName = params.slug
    ? provinceNames[params.slug as ProvinceSlug]
    : 'Unknown Province';

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          {provinceName} Properties
        </h1>
        <ProvinceSearch />
      </div>

      {listings.length === 0 ? (
        <div className="glass-card text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No properties found</h2>
          <p className="text-teal-200/80">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
