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
    <motion.nav
      className={`glass-nav sticky top-0 z-50 transition-shadow duration-200 ${
        !isAtTop ? 'shadow-lg' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10"
            >
              <div className={`absolute inset-0 ${theme === 'dark' ? 'glass-dark' : 'glass'} rounded-full`} />
              <div className="absolute inset-2 flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  SA
                </span>
              </div>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 glass rounded-full px-4 py-2 w-[400px]">
            <Search className="h-4 w-4 text-teal-500" />
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
              className="hover:bg-teal-500/10"
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
                <Button variant="ghost" size="icon" className="hover:bg-teal-500/10">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass">
                {session ? (
                  <>
                    <DropdownMenuLabel className="text-primary">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-teal-500/20" />
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/listings/create" className="flex items-center w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Listing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/listings" className="flex items-center w-full">
                        <Home className="mr-2 h-4 w-4" />
                        My Listings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/bookings" className="flex items-center w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/favorites" className="flex items-center w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/reviews" className="flex items-center w-full">
                        <Star className="mr-2 h-4 w-4" />
                        Reviews
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/messages" className="flex items-center w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-teal-500/20" />
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-500 hover:bg-red-500/10 cursor-pointer"
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
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/auth/signin" className="flex items-center w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary hover:bg-teal-500/10 cursor-pointer">
                      <Link href="/auth/signin" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 