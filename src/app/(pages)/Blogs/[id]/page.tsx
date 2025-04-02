// import Image from "next/image";
// import Link from "next/link";
// import ShowBlogs from "@/Components/ui/ShowBlogs";
// import CommentSection, { Comment } from "@/Components/ui/CommentSection";
// import { notFound } from "next/navigation";

// interface BlogData {
//   title: string;
//   imageURL: string;
//   description: string;
//   comments: Comment[];
// }

// async function getBlogPost(id: string): Promise<BlogData | null> {
//   try {
//     const res = await fetch(`http://localhost:8000/api/v1/blog/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const { message } = await res.json();
//     return message;
//   } catch (error) {
//     console.error("Error fetching blog post:", error);
//     return null;
//   }
// }

// export default async function BlogPost({ params }: { params: { id: string } }) {
//   const message = await getBlogPost(params.id);

//   if (!message) return notFound();

//   return (
//     <>
//       {/* Blog Section */}
//       <div className="bg-gray-50 min-h-screen py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Blog Header */}
//           <p className="text-sm text-gray-500 uppercase mb-2">Posted Blog</p>
//           <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-snug">
//             {message.title || "Untitled Blog"}
//           </h1>

//           {/* Blog Image */}
//           <Image
//             src={message.imageURL || "/assets/image/ImagePlaceholder(2).png"}
//             alt="Blog Image"
//             width={1000}
//             height={800}
//             className="w-full h-auto object-cover rounded-lg mb-8"
//           />

//           {/* Blog Content */}
//           <div className="text-gray-600 space-y-6 leading-relaxed">
//             <p className="text-lg">{message.description || "No description available."}</p>
//           </div>

//           {/* Comment Section */}
//           <CommentSection blogId={params.id} comments={message.comments || []} />
//         </div>
//       </div>

//       {/* Popular Post Section */}
//       <section className="py-8 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <h3 className="text-3xl font-semibold text-gray-800">Popular Posts</h3>
//             <Link
//               href="/Blogs"
//               className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
//             >
//               View All
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Cards Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <ShowBlogs show={3} />
//         </div>
//       </section>
//     </>
//   );
// }

import { FadeIn, StaggerContainer, StaggerItem } from "@/Components/Home/animation"
import BlogCard from "@/Components/Home/blog-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { Bookmark, Facebook, Heart, Linkedin, MessageCircle, Share2, ThumbsUp, Twitter } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

// Mock data for related posts
const relatedPosts = [
  {
    id: "2",
    title: "Getting Started with WebAssembly",
    excerpt: "A beginner's guide to using WebAssembly in your web projects.",
    category: "Technology",
    date: "Mar 10, 2024",
    author: {
      name: "Jamie Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=600&text=WebAssembly",
    likes: 87,
    comments: 12,
  },
  {
    id: "3",
    title: "Edge Computing: The Complete Guide",
    excerpt: "Everything you need to know about deploying applications to the edge.",
    category: "Technology",
    date: "Mar 8, 2024",
    author: {
      name: "Sam Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=600&text=Edge+Computing",
    likes: 76,
    comments: 9,
  },
  {
    id: "4",
    title: "The State of JavaScript Frameworks in 2024",
    excerpt: "Comparing the most popular JavaScript frameworks and their latest features.",
    category: "Technology",
    date: "Mar 5, 2024",
    author: {
      name: "Taylor Swift",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=600&text=JS+Frameworks",
    likes: 112,
    comments: 18,
  },
]

// Mock data for comments
const comments = [
  {
    id: 1,
    author: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    content:
      "This is a fantastic article! I've been following these trends and completely agree with your analysis on WebAssembly.",
    likes: 12,  },
  {
    id: 2,
    author: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "3 days ago",
    content:
      "Great insights on edge computing. I'd love to see a follow-up article on how to optimize applications specifically for edge deployment.",
    likes: 8,
  },
  {
    id: 3,
    author: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "4 days ago",
    content:
      "The section on AI-powered development tools was eye-opening. I've started using GitHub Copilot recently and it's already saving me hours of work each week.",
    likes: 15,
  },
]

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
      <section className="p-10 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <div className="mb-8 p-6 bg-background rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
              <Textarea placeholder="Share your thoughts..." className="mb-4 min-h-[100px]" />
              <Button>Post Comment</Button>
            </div>
          </FadeIn>

          {/* Comments List */}
          <StaggerContainer className="space-y-6">
            {comments.map((comment) => (
              <StaggerItem key={comment.id}>
                <div className="space-y-4">
                  <div className="p-6 bg-background rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{comment.author}</h4>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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


