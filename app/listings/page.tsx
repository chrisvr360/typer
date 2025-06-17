'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
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

export default function MyListingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    try {
      const response = await fetch('/api/listings?userId=' + session?.user?.id);
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
  }, [session?.user?.id]);

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin');
      return;
    }

    fetchListings();
  }, [session, router, fetchListings]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Listing deleted successfully');
        fetchListings();
      } else {
        toast.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button onClick={() => router.push('/listings/create')}>
          Create New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">You haven&apos;t created any listings yet.</p>
          <Button onClick={() => router.push('/listings/create')}>
            Create Your First Listing
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard
              key={listing._id}
              property={listing}
              showActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
} 