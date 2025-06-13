import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { firstName, lastName, username, bio, phoneNumber } = await req.json();

  if (!firstName || !lastName || !username) {
    return NextResponse.json({ error: 'First name, last name, and username are required' }, { status: 400 });
  }

  try {
    await connectDB();

    // Find the user by email from the session to get their ID
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the username is already taken by another user
    const existingUserWithUsername = await User.findOne({ username, _id: { $ne: user._id } });
    if (existingUserWithUsername) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 409 });
    }

    // Update the existing User document with profile details
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { firstName, lastName, username, bio, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile created/updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 