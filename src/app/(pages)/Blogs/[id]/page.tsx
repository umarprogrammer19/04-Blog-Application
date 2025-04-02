import { FadeIn, StaggerContainer, StaggerItem } from "@/Components/Home/animation"
import BlogCard from "@/Components/Home/blog-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import CommentSection from "@/Components/ui/CommentSection"
import { Textarea } from "@/Components/ui/textarea"
import { Bookmark, Facebook, Heart, Linkedin, MessageCircle, Share2, ThumbsUp, Twitter } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const posts = await fetch("http://localhost:8000/api/v1/blogs", {
    cache: "no-store",
  });

  if (!posts.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  const { blogs } = await posts.json();
  const post = blogs.find((post: any) => post._id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <article className="p-10 md:p-16">
        <div className="container max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-8 text-center">
              <Badge className="mb-4">{post.category || "Design"}</Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>{post.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={post.imageURL || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.userRef.imageURL} alt={post.userRef.fullname} />
                  <AvatarFallback>{post.userRef.fullname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.userRef.fullname}</div>
                  <div className="text-sm text-muted-foreground">{"Admin"}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </FadeIn>

          {/* Article Actions */}
          <FadeIn>
            <div className="flex justify-between items-center py-6 border-t border-b">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{post.likesCount} Likes</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments.length} Comments</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Share Section */}
          <FadeIn>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Comments Section */}
      <CommentSection comments={post?.comments} blogId={post._id} />

      {/* Related Posts */}
      <section className="p-16">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4">Related Articles</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">You Might Also Like</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">Explore more articles related to this topic.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {blogs.map((post: any) => (
              <StaggerItem key={post.id}>
                <BlogCard {...post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}


