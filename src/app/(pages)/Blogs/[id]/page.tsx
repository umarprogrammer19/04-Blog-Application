import { FadeIn, StaggerContainer, StaggerItem } from "@/Components/Home/animation"
import BlogCard from "@/Components/Home/blog-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/Button"
import CommentSection from "@/Components/ui/CommentSection"
import { Bookmark, Facebook, Heart, Linkedin, MessageCircle, Share2, Twitter } from "lucide-react"
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
  const post = blogs.find((post: any) => post._id === params.id);

  if (!post) {
    notFound();
  }

  // Filter out the current post from related posts
  const relatedPosts = blogs.filter((blog: any) => blog._id !== params.id);

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
                  <div className="text-sm text-muted-foreground">Admin</div>
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

          {/* Subsections */}
          {post.subsections && post.subsections.length > 0 && (
            <FadeIn>
              <div className="mb-12">
                {post.subsections.map((subsection: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{subsection.subtitle}</h2>
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: subsection.subdescription }}
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Conclusion */}
          {post.conclusion && (
            <FadeIn>
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.conclusion }}
                />
              </div>
            </FadeIn>
          )}

        </div>
      </article>

      {/* Comments Section */}
      <CommentSection comments={post?.comments} blogId={post._id} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
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
              {relatedPosts.slice(0, 3).map((post: any) => (
                <StaggerItem key={post._id}>
                  <BlogCard {...post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </div>
  );
}