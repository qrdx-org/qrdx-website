'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, FileText, Info, Home, Contact } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

const Navigation = () => {
  return (
    <motion.nav 
      className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container flex h-16 items-center px-4 mx-auto">
        <Link href="/" className="mr-8">
          <motion.div
            className="font-bold text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            QRDX
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/services" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Services
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center">
                      <Contact className="mr-2 h-4 w-4" />
                      Contact
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 text-lg font-medium">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link href="/about" className="flex items-center space-x-2 text-lg font-medium">
                  <Info className="h-5 w-5" />
                  <span>About</span>
                </Link>
                <Link href="/services" className="flex items-center space-x-2 text-lg font-medium">
                  <FileText className="h-5 w-5" />
                  <span>Services</span>
                </Link>
                <Link href="/contact" className="flex items-center space-x-2 text-lg font-medium">
                  <Contact className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation