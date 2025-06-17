'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X, Upload } from 'lucide-react';
import Image from 'next/image';

enum Category {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  VILLA = 'Villa',
  COTTAGE = 'Cottage',
  GUESTHOUSE = 'Guesthouse',
  BED_AND_BREAKFAST = 'Bed and Breakfast',
  HOTEL = 'Hotel',
  RESORT = 'Resort',
  LODGE = 'Lodge',
  CAMPING = 'Camping'
}

enum Province {
  WESTERN_CAPE = 'Western Cape',
  EASTERN_CAPE = 'Eastern Cape',
  NORTHERN_CAPE = 'Northern Cape',
  FREE_STATE = 'Free State',
  KWAZULU_NATAL = 'KwaZulu-Natal',
  NORTH_WEST = 'North West',
  GAUTENG = 'Gauteng',
  MPUMALANGA = 'Mpumalanga',
  LIMPOPO = 'Limpopo'
}

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
  category: string;
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
    baths: 0,
    category: 'apartment'
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload({ target: { files } } as any);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Handle image upload logic here
      // For now, we'll just add placeholder URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 6)
      }));
    }
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

  const handleRemoveImage = (index: number) => {
    // Implement the logic to remove an image
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="glass-input shadow-inner"
                  placeholder="Enter property title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-foreground">Tagline</Label>
                <Input
                  id="tagline"
                  className="glass-input shadow-inner"
                  placeholder="Enter tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="glass-input shadow-inner min-h-[150px]"
                  placeholder="Describe your property..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="glass-input shadow-inner"
                  placeholder="Enter property location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-foreground">Price per Night</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="glass-input shadow-inner"
                    placeholder="Enter price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string) => setFormData({ ...formData, category: value as Category })}
                  >
                    <SelectTrigger className="glass-input shadow-inner">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="province" className="text-foreground">Province</Label>
                <Select
                  value={formData.province}
                  onValueChange={(value: string) => setFormData({ ...formData, province: value as Province })}
                >
                  <SelectTrigger className="glass-input shadow-inner">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {Object.values(Province).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities" className="text-foreground">Amenities</Label>
                <Textarea
                  id="amenities"
                  className="glass-input shadow-inner h-32"
                  placeholder="Enter amenities (comma-separated)"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-foreground">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  className="glass-input shadow-inner"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-foreground">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  className="glass-input shadow-inner"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beds" className="text-foreground">Beds</Label>
                <Input
                  id="beds"
                  type="number"
                  className="glass-input shadow-inner"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baths" className="text-foreground">Baths</Label>
                <Input
                  id="baths"
                  type="number"
                  className="glass-input shadow-inner"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Images</Label>
                <div className={`glass-input shadow-inner p-4 border-2 border-dashed rounded-lg ${isDragging ? 'border-primary' : 'border-primary/20'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-primary mb-2" />
                    <p className="text-foreground">Drag and drop images here, or click to select</p>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="glass-button shadow-inner"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="glass-button shadow-inner"
              >
                Create Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 