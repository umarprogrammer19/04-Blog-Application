"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Checkbox } from "@/Components/ui/checkbox"
import { Eye, Edit, Trash2, MoreVertical, Search, Filter, PenSquare } from "lucide-react"

export default function PostsPage() {
    const [selectedPosts, setSelectedPosts] = useState<string[]>([])

    const togglePostSelection = (postId: string) => {
        if (selectedPosts.includes(postId)) {
            setSelectedPosts(selectedPosts.filter((id) => id !== postId))
        } else {
            setSelectedPosts([...selectedPosts, postId])
        }
    }

    const toggleSelectAll = () => {
        if (selectedPosts.length === posts.length) {
            setSelectedPosts([])
        } else {
            setSelectedPosts(posts.map((post) => post.id))
        }
    }

    const posts = [
        {
            id: "1",
            title: "The Future of Web Development",
            excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
            status: "published",
            date: "Mar 15, 2024",
            category: "Technology",
            views: 423,
            comments: 12,
            image: "/placeholder.svg?height=100&width=200&text=Web+Dev",
        },
        {
            id: "2",
            title: "10 Tips for Better Writing",
            excerpt: "Improve your writing skills with these practical tips and techniques.",
            status: "published",
            date: "Mar 10, 2024",
            category: "Writing",
            views: 287,
            comments: 8,
            image: "/placeholder.svg?height=100&width=200&text=Writing",
        },
        {
            id: "3",
            title: "Building Responsive Layouts",
            excerpt: "Learn how to create responsive layouts that work on any device.",
            status: "published",
            date: "Mar 1, 2024",
            category: "Design",
            views: 156,
            comments: 5,
            image: "/placeholder.svg?height=100&width=200&text=Layouts",
        },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
                <p className="text-muted-foreground">View, edit, and manage all your blog posts.</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search posts..." className="pl-8" />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Posts</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link href="/dashboard/create">
                            <Button>
                                <PenSquare className="mr-2 h-4 w-4" />
                                New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsContent value="all" className="mt-4">
                        <Card>
                            <CardHeader className="p-4">
                                <div className="flex items-center gap-4">
                                    <Checkbox
                                        id="select-all"
                                        checked={selectedPosts.length === posts.length}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                    <CardTitle className="text-base">All Posts ({posts.length})</CardTitle>
                                    {selectedPosts.length > 0 && (
                                        <div className="ml-auto flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">{selectedPosts.length} selected</span>
                                            <Button variant="outline" size="sm">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {posts.map((post) => (
                                        <div key={post.id} className="flex items-center gap-4 p-4">
                                            <Checkbox
                                                id={`post-${post.id}`}
                                                checked={selectedPosts.includes(post.id)}
                                                onCheckedChange={() => togglePostSelection(post.id)}
                                            />
                                            <div className="hidden sm:block">
                                                <Image
                                                    src={post.image || "/placeholder.svg"}
                                                    alt={post.title}
                                                    width={100}
                                                    height={60}
                                                    className="rounded-md object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium truncate">{post.title}</h3>
                                                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                    <span>{post.date}</span>
                                                    <span>{post.category}</span>
                                                    {post.status === "published" && (
                                                        <>
                                                            <span>{post.comments} comments</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {post.status === "published" && (
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/blogs/${post.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">View</span>
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                            <span className="sr-only">More</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                        <DropdownMenuItem>Archive</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="published" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Published Posts</CardTitle>
                                <CardDescription>Posts that are live and visible to your audience.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {posts.filter((post) => post.status === "published").length} published posts
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="drafts" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Draft Posts</CardTitle>
                                <CardDescription>Posts that are still being worked on.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {posts.filter((post) => post.status === "draft").length} draft posts
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="archived" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Archived Posts</CardTitle>
                                <CardDescription>Posts that have been archived and are no longer visible.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {posts.filter((post) => post.status === "archived").length} archived posts
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

