import Link from "next/link"
import Image from "next/image"
import { Button } from "@/Components/ui/Button"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import { Search, Filter, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"
import BlogCard from "@/Components/Home/blog-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/Components/Home/animation"

export default async function BlogsPage() {

  const posts = await fetch("http://localhost:8000/api/v1/blogs", {
    cache: "no-store",
  });

  if (!posts.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  const { blogs } = await posts.json();
  const featuredPost = blogs;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted/30 p-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <FadeIn direction="right">
              <div className="flex flex-col gap-4">
                <Badge className="w-fit">Our Blog</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Explore Our Collection of Insights</h1>
                <p className="text-xl text-muted-foreground">
                  Discover articles on technology, design, business, and more from our expert contributors.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-background shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search articles..." className="pl-10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="Branding">Branding</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="comments">Most Comments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="p-16 bg-muted/30">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4">All Articles</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Browse Our Latest Content</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                Explore our collection of articles covering a wide range of topics.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPost.map((post: any, index: number) => {
              return index <= 2 && <StaggerItem key={post._id}>
                <BlogCard {...post} />
              </StaggerItem>
            }
            )}
          </StaggerContainer>

          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="p-16">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4">Popular Topics</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Explore by Category</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                Find content that matches your interests and professional needs.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Development", color: "border-blue-500" },
              { name: "Design", color: "border-purple-500" },
              { name: "Marketing", color: "border-yellow-500" },
              { name: "Business", color: "border-green-500" },
              { name: "Education", color: "border-red-500" },
              { name: "Lifestyle", color: "border-indigo-500" },
              { name: "Artificial Intelligence", color: "border-pink-500" },
              { name: "Branding", color: "border-teal-500" },
            ].map((category, i) => (
              <FadeIn key={category.name} delay={i * 0.1}>
                <Link href={`/blogs?category=${category.name.toLowerCase()}`}>
                  <div className={`group relative overflow-hidden rounded-lg border-l-4 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md ${category.color}`}>
                    <div className="relative h-24">
                      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-70" />
                      <div className="absolute inset-0 flex items-center p-4 text-white">
                        <div className="flex justify-between w-full items-center">
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <ArrowRight className="mt-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


