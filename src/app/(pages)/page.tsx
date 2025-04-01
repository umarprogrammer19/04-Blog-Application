import { FadeIn, ScaleIn, SlideUp, StaggerContainer, StaggerItem } from "@/Components/Home/animation";
import BlogCard from "@/Components/Home/blog-card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Technology", count: 42, color: "bg-blue-500" },
  { name: "Design", count: 28, color: "bg-purple-500" },
  { name: "Business", count: 35, color: "bg-green-500" },
  { name: "Marketing", count: 19, color: "bg-yellow-500" },
  { name: "Productivity", count: 23, color: "bg-red-500" },
  { name: "Career", count: 31, color: "bg-indigo-500" },
]

export default async function Home() {
  const posts = await fetch("http://localhost:8000/api/v1/blogs", {
    cache: "no-store",
  });

  if (!posts.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  const { blogs } = await posts.json();
  const featuredPosts = blogs;
  console.log(featuredPosts);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background p-20 md:p-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <FadeIn direction="right">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit">Featured Content</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Insights that <span className="text-primary">inspire</span> and{" "}
                  <span className="text-primary">inform</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Discover thought-provoking articles from industry experts and innovative thinkers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" asChild>
                    <Link href="/blogs">
                      Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/signup">Join Our Community</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/Hero.avif"
                    alt="Hero"
                    width={800}
                    height={600}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      </section>

      {/* Featured Posts */}
      <section className="p-20">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4">Featured Articles</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Trending Insights</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                Dive into our most popular articles, curated to keep you informed on the latest trends and ideas.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post: any, index: number) => {
              return index <= 2 && <StaggerItem key={post.id}>
                <BlogCard {...post} />
              </StaggerItem>
            }
            )}
          </StaggerContainer>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blogs">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Creative Section */}
      <section className="p-20 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <ScaleIn>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/why_choose1.png"
                        alt="Creative content"
                        width={300}
                        height={300}
                        className="w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/why_choose2.png"
                        alt="Creative content"
                        width={300}
                        height={300}
                        className="w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/why_choose3.png"
                        alt="Creative content"
                        width={300}
                        height={300}
                        className="w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/why_choose4.png"
                        alt="Creative content"
                        width={300}
                        height={300}
                        className="w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
            <FadeIn direction="left">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit">Why Choose Us</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  A platform built for professional content creators
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our platform provides the tools and audience you need to share your expertise and build your
                  professional brand.
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      title: "Expert Contributors",
                      description: "Articles written by industry professionals and thought leaders",
                    },
                    {
                      title: "Quality Content",
                      description: "Carefully curated and edited for accuracy and relevance",
                    },
                    {
                      title: "Global Reach",
                      description: "Connect with readers and professionals worldwide",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="p-20 bg-muted/30">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4">Browse by Topic</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Explore Categories</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                Find content tailored to your interests and professional needs.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <SlideUp key={category.name} delay={i * 0.1}>
                <Link href={`/blogs?category=${category.name.toLowerCase()}`}>
                  <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60 transition-opacity group-hover:opacity-80" />
                    <div className={`absolute left-0 top-0 h-full w-2 ${category.color}`} />
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} articles</p>
                      <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="p-20">
        <div className="container">
          <div className="rounded-xl bg-primary/5 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <FadeIn direction="right">
                <div className="flex flex-col gap-4">
                  <Badge className="w-fit">Stay Updated</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to our newsletter</h2>
                  <p className="text-muted-foreground">
                    Get the latest articles, resources, and insights delivered directly to your inbox.
                  </p>
                </div>
              </FadeIn>
              <FadeIn direction="left">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Enter your email" className="sm:rounded-r-none" />
                    <Button className="sm:rounded-l-none">Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

