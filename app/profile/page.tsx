'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have or will create this
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // Read-only
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user) {
      router.push('/auth/signin');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setUsername(data.username || '');
          setBio(data.bio || '');
          setPhoneNumber(data.phoneNumber || '');
          // Set profile image from database, fallback to Google image if available
          setProfileImage(data.image || session?.user?.image || null);
        } else {
          toast.info('Profile not found.', { description: 'Please create your profile.' });
          router.push('/profile/create');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setProfileLoading(false);
      }
    };

    if (session?.user) {
      fetchProfile();
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session || !session.user) {
      toast.error('Authentication error.', { description: 'Please sign in again.' });
      router.push('/auth/signin');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, bio, phoneNumber }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        await update(); // Update session to reflect changes if NextAuth updates user object
      } else {
        const errorData = await response.json();
        toast.error('Profile update failed.', {
          description: errorData.error || 'Something went wrong.',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred.', { description: 'Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'profile');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      // Update user profile with new image
      const updateResponse = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          bio,
          phoneNumber,
          image: data.imageUrl,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Update local state with new image URL
      setProfileImage(data.imageUrl);
      toast.success('Profile image updated successfully');
      
      // Update session to reflect new image
      await update({
        ...session,
        user: {
          ...session?.user,
          image: data.imageUrl
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading profile...</p></div>;
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card p-6">
        <h2 className="text-center text-3xl font-bold mb-6">My Profile</h2>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              readOnly // Username is read-only
              className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., +27 12 345 6789"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Updating Profile...' : 'Update Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
} 