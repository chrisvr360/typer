'use client';

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center justify-center w-full h-full p-4 ${inter.className}`}>
      {/* Children will receive SessionProvider context from root layout */}
      {children}
    </div>
  );
} 