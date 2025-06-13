import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { firstName, lastName, bio, phoneNumber } = await req.json();

  try {
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { firstName, lastName, bio, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 