'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { PROVINCES, Province } from '@/lib/constants';

interface FormData {
  title: string;
  tagline: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  province: Province;
  amenities: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
}

export default function CreateListingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    tagline: '',
    description: '',
    location: '',
    price: 0,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
    ],
    province: '' as Province,
    amenities: '',
    guests: 0,
    bedrooms: 0,
    beds: 0,
    baths: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast.error('Please sign in to create a listing');
      return;
    }

    if (!formData.location) {
      toast.error('Please enter a location');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category: formData.province,
          amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create listing');
      }

      toast.success('Listing created successfully!');
      router.push('/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Create New Listing
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* General Info Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">General Info</h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                  Name (20 limit)
                </label>
                <input
                  type="text"
                  id="title"
                  maxLength={20}
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-foreground mb-1">
                  Tagline (30 limit)
                </label>
                <input
                  type="text"
                  id="tagline"
                  maxLength={30}
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                  Price (R)
                </label>
                <input
                  type="number"
                  id="price"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="province" className="block text-sm font-medium text-foreground mb-1">
                  Province
                </label>
                <select
                  id="province"
                  value={formData.province}
                  onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value as Province }))}
                  className="glass-input w-full"
                  required
                >
                  <option value="">Select a province</option>
                  {PROVINCES.map((province) => (
                    <option key={province.value} value={province.value}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                  Description (10 - 1000 words)
                </label>
                <textarea
                  id="description"
                  minLength={10}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="glass-input w-full h-32"
                  required
                />
              </div>
            </div>

            {/* Accommodation Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Accommodation Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">
                    Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    min="0"
                    value={formData.guests}
                    onChange={(e) => setFormData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-foreground mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="beds" className="block text-sm font-medium text-foreground mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    id="beds"
                    min="0"
                    value={formData.beds}
                    onChange={(e) => setFormData(prev => ({ ...prev, beds: Number(e.target.value) }))}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="baths" className="block text-sm font-medium text-foreground mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    id="baths"
                    min="0"
                    value={formData.baths}
                    onChange={(e) => setFormData(prev => ({ ...prev, baths: Number(e.target.value) }))}
                    className="glass-input w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Amenities</h2>
              
              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-foreground mb-1">
                  Enter amenities (comma-separated)
                </label>
                <textarea
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => setFormData(prev => ({ ...prev, amenities: e.target.value }))}
                  className="glass-input w-full h-32"
                  placeholder="e.g., WiFi, Parking, Kitchen, Pool"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="glass-button"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 