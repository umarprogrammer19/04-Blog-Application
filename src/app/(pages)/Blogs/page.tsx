// import ShowBlogs from "@/Components/ui/ShowBlogs";

// const Blogs = () => {

//   return (
//     <div className="bg-gray-50">
//       {/* Header Section */}
//       <section className="py-12 text-center">
//         <div className="max-w-3xl mx-auto px-4">
//           <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
//             OUR BLOGS
//           </p>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Find all our blogs here
//           </h2>
//           <p className="text-gray-600 text-base leading-relaxed">
//             Our blogs are carefully researched and well-written to provide you
//             with the best content. Explore the articles curated just for you.
//           </p>
//         </div>
//       </section>

//       {/* Cards Section */}

//       {/* Cards Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-7xl">
//             <ShowBlogs />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Blogs;



import Link from "next/link"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
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

// const featuredPost = {
//   id: "1",
//   title: "The Future of Web Development: Trends to Watch in 2024",
//   excerpt:
//     "Explore the cutting-edge technologies and methodologies that are shaping the future of web development. From AI-powered tools to new frameworks and paradigms, discover what's next in the world of web development.",
//   category: "Technology",
//   date: "Mar 15, 2024",
//   author: {
//     name: "Alex Morgan",
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   image: "/placeholder.svg?height=600&width=1200&text=Featured+Blog",
//   likes: 124,
//   comments: 23,
// }

// const blogPosts = [
//   {
//     id: "2",
//     title: "Designing for Accessibility: A Comprehensive Guide",
//     excerpt: "Learn how to create inclusive digital experiences that work for everyone, regardless of ability.",
//     category: "Design",
//     date: "Mar 12, 2024",
//     author: {
//       name: "Jamie Chen",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=Accessibility",
//     likes: 98,
//     comments: 15,
//   },
//   {
//     id: "3",
//     title: "The Psychology of Productivity: Maximizing Your Workflow",
//     excerpt: "Discover science-backed strategies to enhance your productivity and achieve more in less time.",
//     category: "Productivity",
//     date: "Mar 10, 2024",
//     author: {
//       name: "Sam Wilson",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=Productivity",
//     likes: 87,
//     comments: 12,
//   },
//   {
//     id: "4",
//     title: "Mastering CSS Grid: Advanced Layout Techniques",
//     excerpt: "Take your CSS Grid skills to the next level with these advanced techniques and practical examples.",
//     category: "Development",
//     date: "Mar 8, 2024",
//     author: {
//       name: "Taylor Swift",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=CSS+Grid",
//     likes: 76,
//     comments: 9,
//   },
//   {
//     id: "5",
//     title: "The Rise of AI in Content Creation",
//     excerpt: "How artificial intelligence is transforming the way we create and consume content online.",
//     category: "AI",
//     date: "Mar 5, 2024",
//     author: {
//       name: "Jordan Lee",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=AI+Content",
//     likes: 112,
//     comments: 18,
//   },
//   {
//     id: "6",
//     title: "Building a Personal Brand as a Developer",
//     excerpt: "Strategies for establishing your professional identity and standing out in a competitive industry.",
//     category: "Career",
//     date: "Mar 3, 2024",
//     author: {
//       name: "Casey Kim",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=Personal+Brand",
//     likes: 94,
//     comments: 14,
//   },
//   {
//     id: "7",
//     title: "Understanding Web Performance Metrics",
//     excerpt: "A deep dive into the key metrics that affect your website's performance and user experience.",
//     category: "Performance",
//     date: "Mar 1, 2024",
//     author: {
//       name: "Riley Johnson",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     image: "/placeholder.svg?height=400&width=600&text=Web+Performance",
//     likes: 68,
//     comments: 7,
//   },
// ]

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
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
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

      {/* Featured Post */}
      {/* <section className="p-16">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-8">
              <Badge className="mb-4">Featured Article</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Editor's Pick</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPost.map((post: any, index: number) => {
              return index <= 2 && <StaggerItem key={post.id}>
                <BlogCard {...post} />
              </StaggerItem>
            }
            )}
          </StaggerContainer>

          <FadeIn>
            <BlogCard {...featuredPost} variant="horizontal" className="md:h-80" />
          </FadeIn>
        </div>
      </section> */}

      {/* All Blog Posts */}
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
              return index <= 2 && <StaggerItem key={post.id}>
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
              { name: "Technology", count: 42, image: "/placeholder.svg?height=200&width=300&text=Technology" },
              { name: "Design", count: 28, image: "/placeholder.svg?height=200&width=300&text=Design" },
              { name: "Business", count: 35, image: "/placeholder.svg?height=200&width=300&text=Business" },
              { name: "Marketing", count: 19, image: "/placeholder.svg?height=200&width=300&text=Marketing" },
              { name: "Productivity", count: 23, image: "/placeholder.svg?height=200&width=300&text=Productivity" },
              { name: "Career", count: 31, image: "/placeholder.svg?height=200&width=300&text=Career" },
              { name: "AI", count: 17, image: "/placeholder.svg?height=200&width=300&text=AI" },
              { name: "Development", count: 39, image: "/placeholder.svg?height=200&width=300&text=Development" },
            ].map((category, i) => (
              <FadeIn key={category.name} delay={i * 0.1}>
                <Link href={`/blogs?category=${category.name.toLowerCase()}`}>
                  <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                    <div className="relative h-40">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-70" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm">{category.count} articles</p>
                        <ArrowRight className="mt-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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


