'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have or will create this

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

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user) {
      router.push('/auth/signin');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setUsername(data.username || '');
            setBio(data.bio || '');
            setPhoneNumber(data.phoneNumber || '');
          } else {
            toast.info('Profile not found.', { description: 'Please create your profile.' });
            router.push('/profile/create');
          }
        } else if (res.status === 404) {
          toast.info('Profile not found.', { description: 'Please create your profile.' });
          router.push('/profile/create');
        } else {
          toast.error('Failed to fetch profile.', { description: 'Please try again.' });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('An unexpected error occurred while fetching profile.');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

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

  if (profileLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading profile...</p></div>;
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card p-6">
        <h2 className="text-center text-3xl font-bold mb-6">My Profile</h2>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Profile Image Placeholder */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
              {/* Placeholder for actual image */}
              <span>No Image</span>
              {/* Future: <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> */}
            </div>
            <Button variant="outline" type="button" disabled>Upload Image (Coming Soon)</Button>
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