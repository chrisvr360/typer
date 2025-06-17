"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Menu, Search, Moon, Sun, User, Home, Calendar, Settings, LogOut, Heart, Star, MessageSquare, LogIn, Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isAtTop } = useScrollDirection()
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className={`${theme === 'dark' ? 'glass-nav' : 'glass'} border-b border-primary/20 ${!isAtTop ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10"
            >
              <div className={`absolute inset-0 ${theme === 'dark' ? 'glass-dark' : 'glass'} rounded-full shadow-lg`} />
              <div className="absolute inset-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  SA
                </span>
              </div>
            </motion.div>
            <span className="text-xl font-bold text-primary">
              Accommodation South Africa
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 glass rounded-full px-4 py-2 w-[400px] shadow-lg">
            <Search className="h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-primary/10 text-foreground"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-foreground">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card shadow-lg">
                {session ? (
                  <>
                    <DropdownMenuLabel className="text-primary">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/listings/create" className="flex items-center w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Listing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/listings" className="flex items-center w-full">
                        <Home className="mr-2 h-4 w-4" />
                        My Listings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/bookings" className="flex items-center w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/favorites" className="flex items-center w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/reviews" className="flex items-center w-full">
                        <Star className="mr-2 h-4 w-4" />
                        Reviews
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/messages" className="flex items-center w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive hover:bg-destructive/10 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <div className="flex items-center w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </div>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="text-foreground hover:bg-primary/10 cursor-pointer">
                      <Link href="/auth/signin" className="flex items-center w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  )
} 