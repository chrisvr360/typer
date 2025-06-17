import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { Types } from 'mongoose';

interface PropertyDocument {
  _id: Types.ObjectId;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  owner?: {
    firstName: string;
    lastName: string;
  };
}

interface ProvinceProperty {
  id: Types.ObjectId;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export async function GET() {
  try {
    await connectDB();

    // Get exactly 3 featured properties (most recent listings with highest ratings)
    const featuredProperties = await Property.find()
      .sort({ rating: -1, createdAt: -1 })
      .limit(3)
      .populate('owner', 'firstName lastName')
      .lean();

    // Ensure featured properties have all required fields
    const validatedFeaturedProperties = (featuredProperties as unknown as PropertyDocument[]).map(property => ({
      id: property._id.toString(),
      title: property.title || 'Untitled Property',
      location: property.location || 'Location not specified',
      price: property.price || 0,
      rating: property.rating || 0,
      image: property.images?.[0] || '/images/placeholder-property.jpg',
      owner: property.owner ? {
        firstName: property.owner.firstName || '',
        lastName: property.owner.lastName || ''
      } : undefined
    }));

    // Get properties grouped by province
    const provinces = await Property.aggregate([
      {
        $group: {
          _id: '$category',
          properties: {
            $push: {
              id: '$_id',
              title: '$title',
              location: '$location',
              price: '$price',
              rating: '$rating',
              image: { $arrayElemAt: ['$images', 0] }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id', 'eastern-cape'] }, then: 'Eastern Cape' },
                { case: { $eq: ['$_id', 'free-state'] }, then: 'Free State' },
                { case: { $eq: ['$_id', 'gauteng'] }, then: 'Gauteng' },
                { case: { $eq: ['$_id', 'kwazulu-natal'] }, then: 'KwaZulu-Natal' },
                { case: { $eq: ['$_id', 'limpopo'] }, then: 'Limpopo' },
                { case: { $eq: ['$_id', 'mpumalanga'] }, then: 'Mpumalanga' },
                { case: { $eq: ['$_id', 'northern-cape'] }, then: 'Northern Cape' },
                { case: { $eq: ['$_id', 'north-west'] }, then: 'North West' },
                { case: { $eq: ['$_id', 'western-cape'] }, then: 'Western Cape' }
              ],
              default: 'Unknown'
            }
          },
          slug: '$_id',
          properties: { $slice: ['$properties', 2] }
        }
      }
    ]);

    // Validate province properties
    const validatedProvinces = provinces.map(province => ({
      ...province,
      properties: province.properties.map((property: ProvinceProperty) => ({
        id: property.id.toString(),
        title: property.title || 'Untitled Property',
        location: property.location || 'Location not specified',
        price: property.price || 0,
        rating: property.rating || 0,
        image: property.image || '/images/placeholder-property.jpg'
      }))
    }));

    return NextResponse.json({
      featuredProperties: validatedFeaturedProperties,
      provinces: validatedProvinces
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    );
  }
} 