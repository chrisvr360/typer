import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { CategoryNav } from "../components/CategoryNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SA Stays - South African Accommodation",
  description: "Find the perfect accommodation in South Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <CategoryNav />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
