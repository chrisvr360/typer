'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating?: number;
  image: string;
  owner?: {
    firstName: string;
    lastName: string;
  };
}

interface Province {
  name: string;
  slug: string;
  properties: Property[];
}

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('/api/home');
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data');
        }
        const data = await response.json();
        setFeaturedProperties(data.featuredProperties);
        setProvinces(data.provinces);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Properties Section */}
      <div>
        <div className="glass-card flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">
            Featured Properties
          </h1>
          <Button variant="outline" className="hover:bg-primary/10">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {featuredProperties.map((property) => (
            <Link href={`/listings/${property.id}`} key={property.id}>
              <motion.div
                className="glass-card group overflow-hidden cursor-pointer"
              >
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                    </div>
                    <div className="flex items-center bg-primary/20 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm text-primary">{property.rating?.toFixed(1) ?? 'New'}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-foreground">
                      R{property.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Province Sections */}
      {provinces.map((province) => (
        <div key={province.slug}>
          <div className="glass-card flex justify-between items-center">
            <h2 className="text-3xl font-bold text-foreground">
              {province.name}
            </h2>
            <Link href={`/province/${province.slug}`}>
              <Button variant="outline" className="hover:bg-primary/10">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {province.properties.map((property) => (
              <Link href={`/listings/${property.id}`} key={property.id}>
                <motion.div
                  className="glass-card group overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="flex items-center bg-primary/20 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm text-primary">{property.rating?.toFixed(1) ?? 'New'}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold text-foreground">
                        R{property.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}