"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Menu, X } from 'lucide-react'
import Logout from "./Logout"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            DevBlog
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
            >
              Home
            </Link>
            <Link
              href="/Blogs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
            >
              Blogs
            </Link>
            <Link
              href="/About"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
            >
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/Login">
              <Button variant="ghost" className="text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/Register">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Get Started
              </Button>
            </Link>
            <Logout />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container py-6">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-lg font-medium hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/Blogs"
                className="text-lg font-medium hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/About"
                className="text-lg font-medium hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 space-y-4">
                <Link href="/Login" className="block">
                  <Button variant="ghost" className="w-full justify-start text-lg">
                    Sign In
                  </Button>
                </Link>
                <Link href="/Register" className="block">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Get Started
                  </Button>
                </Link>
                <Logout />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
