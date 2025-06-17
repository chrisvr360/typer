'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { PROVINCES, Province } from '@/lib/constants';
import Image from 'next/image';
import { X } from 'lucide-react';

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
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    tagline: '',
    description: '',
    location: '',
    price: 0,
    images: [],
    province: '' as Province,
    amenities: '',
    guests: 0,
    bedrooms: 0,
    beds: 0,
    baths: 0
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate number of images (max 10)
    if (formData.images.length + files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    setUploadingImages(true);
    try {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please upload only image files');
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Image size should be less than 5MB');
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'property');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        newImages.push(data.imageUrl);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));

      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

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
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <Image
                      src={image}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {formData.images.length < 10 && (
                  <div
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-teal-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="text-gray-400">Add Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <p className="text-sm text-gray-400">
                Upload up to 10 images. Each image should be less than 5MB.
              </p>
            </div>

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