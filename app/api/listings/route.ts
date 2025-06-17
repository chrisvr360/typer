import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import User from '@/models/User';
import { Province } from '@/lib/constants';

// GET /api/listings - Get all listings or user's listings
export async function GET(req: Request) {
  const session = await getServerSession();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const category = searchParams.get('category');

  try {
    await connectDB();

    let query = {};
    if (userId) {
      query = { owner: userId };
    } else if (category) {
      query = { category };
    }

    const listings = await Property.find(query)
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create a new listing
export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();
    await connectDB();

    // Get the user's ID from their email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the new listing
    const listing = await Property.create({
      ...data,
      owner: user._id,
      category: data.province, // Use province as category
    });

    // Add the listing to the user's properties array
    await User.findByIdAndUpdate(user._id, {
      $push: { properties: listing._id }
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
} 