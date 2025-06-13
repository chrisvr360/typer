import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CategoryNav } from "../components/CategoryNav";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SA Stays - South African Accommodation",
  description: "Find the perfect accommodation in South Africa",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <CategoryNav />
            <main className="container mx-auto px-4 py-8 max-w-screen-xl relative z-10">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
