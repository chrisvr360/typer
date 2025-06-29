import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongodb-adapter';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub!;
      }

      // After sign-in, check if the user has a complete profile directly on the User object
      if (user && user.id) {
        await connectDB();
        const userInDb = await User.findById(user.id); // Fetch the user from DB to get latest fields

        if (!userInDb || !userInDb.firstName || !userInDb.lastName || !userInDb.username) {
          // If essential profile fields are missing, redirect to profile creation
          return { ...session, redirectTo: '/profile/create' };
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}; 