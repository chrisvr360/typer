'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    images: string[];
    category: string;
    rating: number;
    owner?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  showActions?: boolean;
  onDelete?: (id: string, e: React.MouseEvent) => void;
}

export function PropertyCard({ property, showActions = false, onDelete }: PropertyCardProps) {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/listings/${property._id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(property._id, e);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card group overflow-hidden cursor-pointer"
      onClick={() => router.push(`/listings/${property._id}`)}
    >
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <Image
          src={property.images[0] || '/placeholder.jpg'}
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
            <h3 className="font-semibold text-lg text-white">{property.title}</h3>
            <p className="text-sm text-teal-200/80">{property.location}</p>
          </div>
          <div className="flex items-center bg-teal-500/20 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-teal-400 text-teal-400" />
            <span className="ml-1 text-sm text-teal-200">{property.rating}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-white">
            R{property.price.toLocaleString()} <span className="text-sm font-normal text-teal-200/80">/ night</span>
          </p>
        </div>
        {showActions && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleEdit}
              className="glass-button text-sm px-3 py-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="glass-button text-sm px-3 py-1 text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
} 