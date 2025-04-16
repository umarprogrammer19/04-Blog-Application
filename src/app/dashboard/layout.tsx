import Navbar from "@/Components/ui/Navbar"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import type React from "react"

export const metadata: Metadata = {
  title: "Dashboard - BlogWave",
  description: "Manage your blog posts and account",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Navbar />
      <div className="flex w-full min-h-screen max-w-7xl mx-auto">
        <div className="flex-1 w-full">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
