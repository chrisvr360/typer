// app/category/[province]/ProvinceClient.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { toast }        from 'sonner';

interface Property {
  _id:      string;
  title:    string;
  description: string;
  location: string;
  price:    number;
  images:   string[];
  category: string;
  rating:   number;
  owner:    { firstName: string; lastName: string; email: string };
}

export default function ProvinceClient({ province }: { province: string }) {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading,  setLoading]  = useState(true);

  const fetchListings = useCallback(async () => {
    try {
      const res = await fetch(`/api/listings?category=${province}`);
      if (!res.ok) throw new Error('Fetch failed');
      setListings(await res.json());
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  }, [province]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings…</div>
      </div>
    );
  }

  const provinceName = province
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{provinceName} Listings</h1>
      {listings.length === 0 ? (
        <p className="text-center text-gray-600">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(l => (
            <PropertyCard key={l._id} property={l} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
}
