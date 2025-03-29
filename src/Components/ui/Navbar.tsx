"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    setShowNavbar(!(pathname === "/login" || pathname === "/signup"))
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showNavbar) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Insight
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === route.href}>
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold">Insight</span>
                </Link>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      pathname === route.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-4 flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

// "use client"
// import Link from "next/link"
// import { useState } from "react"
// import { Button } from "@/Components/ui/button"
// import { Menu, X } from 'lucide-react'
// import Logout from "./Logout"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <nav className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
//             DevBlog
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex md:items-center md:space-x-8">
//           <div className="flex space-x-6">
//             <Link
//               href="/"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
//             >
//               Home
//             </Link>
//             <Link
//               href="/Blogs"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
//             >
//               Blogs
//             </Link>
//             <Link
//               href="/About"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-600"
//             >
//               About
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link href="/Login">
//               <Button variant="ghost" className="text-sm font-medium">
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/Register">
//               <Button className="bg-purple-600 text-white hover:bg-purple-700">
//                 Get Started
//               </Button>
//             </Link>
//             <Logout />
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="block md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? (
//             <X className="h-6 w-6" />
//           ) : (
//             <Menu className="h-6 w-6" />
//           )}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
//           <nav className="container py-6">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 href="/"
//                 className="text-lg font-medium hover:text-purple-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/Blogs"
//                 className="text-lg font-medium hover:text-purple-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Blogs
//               </Link>
//               <Link
//                 href="/About"
//                 className="text-lg font-medium hover:text-purple-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 About
//               </Link>
//               <div className="pt-4 space-y-4">
//                 <Link href="/Login" className="block">
//                   <Button variant="ghost" className="w-full justify-start text-lg">
//                     Sign In
//                   </Button>
//                 </Link>
//                 <Link href="/Register" className="block">
//                   <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
//                     Get Started
//                   </Button>
//                 </Link>
//                 <Logout />
//               </div>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   )
// }