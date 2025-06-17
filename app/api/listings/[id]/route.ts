// app/api/listings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession }          from 'next-auth';
import connectDB                     from '@/lib/mongodb';
import Property                      from '@/models/Property';
import User                          from '@/models/User';

// Ensure getServerSession runs in Node.js
export const runtime = 'nodejs';

// Context where params.id comes in as a Promise
type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const listing = await Property.findOne({
      _id:   id,
      owner: user._id,
    });
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found or unauthorized' },
        { status: 404 }
      );
    }

    await Property.findByIdAndDelete(id);
    await User.findByIdAndUpdate(user._id, {
      $pull: { properties: id },
    });

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  try {
    await connectDB();

    const listing = await Property.findById(id).populate(
      'owner',
      'firstName lastName email'
    );
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}
