'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, FileText, TrendingUp, Droplets, Coins, BookOpen, Search, HelpCircle, Rocket } from 'lucide-react'
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
import { ThemeToggle } from "@/components/theme-toggle"
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
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/get-started" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <Rocket className="mr-2 h-4 w-4" />
                      Get Started
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/trade" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Trade
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pools" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <Droplets className="mr-2 h-4 w-4" />
                      Pools
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/stake" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <Coins className="mr-2 h-4 w-4" />
                      Stake
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Docs
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="https://explorer.qrdx.org" target="_blank" rel="noopener noreferrer" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <Search className="mr-2 h-4 w-4" />
                      Explorer
                    </div>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <div className="flex items-center font-medium">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Support
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="/whitepaper" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Whitepaper
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/trade">Launch App</Link>
          </Button>
          <ThemeToggle />
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/get-started" className="flex items-center space-x-2 text-lg font-medium">
                  <Rocket className="h-5 w-5" />
                  <span>Get Started</span>
                </Link>
                <Link href="/trade" className="flex items-center space-x-2 text-lg font-medium">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trade</span>
                </Link>
                <Link href="/pools" className="flex items-center space-x-2 text-lg font-medium">
                  <Droplets className="h-5 w-5" />
                  <span>Pools</span>
                </Link>
                <Link href="/stake" className="flex items-center space-x-2 text-lg font-medium">
                  <Coins className="h-5 w-5" />
                  <span>Stake</span>
                </Link>
                <Link href="/docs" className="flex items-center space-x-2 text-lg font-medium">
                  <BookOpen className="h-5 w-5" />
                  <span>Docs</span>
                </Link>
                <a href="https://explorer.qrdx.org" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-lg font-medium">
                  <Search className="h-5 w-5" />
                  <span>Explorer</span>
                </a>
                <Link href="/contact" className="flex items-center space-x-2 text-lg font-medium">
                  <HelpCircle className="h-5 w-5" />
                  <span>Support</span>
                </Link>
                <Link href="/whitepaper" className="flex items-center space-x-2 text-lg font-medium">
                  <FileText className="h-5 w-5" />
                  <span>Whitepaper</span>
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