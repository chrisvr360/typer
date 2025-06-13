'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignIn() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              Sign in with Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <Button type="submit" className="w-full">
              Sign in with Email (Currently disabled)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 