// import PostForm from '@/Components/Dashboard/PostForm';
// import UserBlogs from '@/Components/Dashboard/UserBlogs';

// export default function FullScreenBlogPostForm() {
//     return (
//         <div>
//             <PostForm />
//             <UserBlogs />
//         </div>
//     );
// }
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer"
import { PenSquare, Trash2, Edit, Eye, FileImage, Plus } from "lucide-react"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/Components/Home/animation"

// Mock data for user's blogs
const userBlogs = [
    {
        id: "1",
        title: "The Future of Web Development: Trends to Watch in 2024",
        description:
            "Explore the cutting-edge technologies and methodologies that are shaping the future of web development.",
        image: "/placeholder.svg?height=400&width=600&text=Web+Development",
        date: "Mar 15, 2024",
    },
    {
        id: "2",
        title: "Designing for Accessibility: A Comprehensive Guide",
        description: "Learn how to create inclusive digital experiences that work for everyone, regardless of ability.",
        image: "/placeholder.svg?height=400&width=600&text=Accessibility",
        date: "Mar 12, 2024",
    },
    {
        id: "3",
        title: "The Psychology of Productivity: Maximizing Your Workflow",
        description: "Discover science-backed strategies to enhance your productivity and achieve more in less time.",
        image: "/placeholder.svg?height=400&width=600&text=Productivity",
        date: "Mar 10, 2024",
    },
]

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("post")
    const [blogs, setBlogs] = useState(userBlogs)
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        image: "/placeholder.svg?height=400&width=600&text=New+Blog",
    })
    const [editBlog, setEditBlog] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState("")

    const handleNewBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewBlog((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditBlog((prev) => ({ ...prev, [name]: value }))
    }

    const handlePostBlog = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate posting a new blog
        setTimeout(() => {
            const id = (blogs.length + 1).toString()
            const newBlogWithId = {
                id,
                ...newBlog,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
            }
            setBlogs([newBlogWithId, ...blogs])
            setNewBlog({
                title: "",
                description: "",
                image: "/placeholder.svg?height=400&width=600&text=New+Blog",
            })
            setIsSubmitting(false)
            setActiveTab("blogs")
        }, 1500)
    }

    const handleEditClick = (blog: (typeof blogs)[0]) => {
        setEditBlog({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            image: blog.image,
        })
        setIsDrawerOpen(true)
    }

    const handleSaveEdit = () => {
        setIsSubmitting(true)

        // Simulate saving edited blog
        setTimeout(() => {
            setBlogs(blogs.map((blog) => (blog.id === editBlog.id ? { ...blog, ...editBlog } : blog)))
            setIsSubmitting(false)
            setIsDrawerOpen(false)
        }, 1500)
    }

    const handleDeleteClick = (id: string) => {
        setBlogToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        // Simulate deleting a blog
        setTimeout(() => {
            setBlogs(blogs.filter((blog) => blog.id !== blogToDelete))
            setIsDeleteDialogOpen(false)
        }, 500)
    }

    return (
        <div className="container w-full p-10 mx-auto">
            <FadeIn>
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your blog posts and create new content.</p>
                </div>
            </FadeIn>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="post">Create Post</TabsTrigger>
                    <TabsTrigger value="blogs">My Blogs</TabsTrigger>
                </TabsList>

                <TabsContent value="post" className="mt-6">
                    <SlideUp>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Blog Post</CardTitle>
                                <CardDescription>Share your knowledge and insights with the world.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handlePostBlog}>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Blog Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Enter a descriptive title"
                                            value={newBlog.title}
                                            onChange={handleNewBlogChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Blog Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Write your blog content here..."
                                            className="min-h-[200px]"
                                            value={newBlog.description}
                                            onChange={handleNewBlogChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Blog Image</Label>
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="relative w-full h-[200px] bg-muted rounded-md overflow-hidden">
                                                <Image
                                                    src={newBlog.image || "/placeholder.svg"}
                                                    alt="Blog preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <Button type="button" variant="outline" className="w-full">
                                                <FileImage className="mr-2 h-4 w-4" />
                                                Choose Image
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Posting..." : "Post Blog"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </SlideUp>
                </TabsContent>

                <TabsContent value="blogs" className="mt-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Your Blog Posts</h2>
                        <Button onClick={() => setActiveTab("post")}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Post
                        </Button>
                    </div>

                    {blogs.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center p-12">
                                <div className="rounded-full bg-muted p-6 mb-4">
                                    <PenSquare className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                                <p className="text-muted-foreground text-center max-w-md mb-6">
                                    You haven't created any blog posts yet. Start sharing your thoughts and insights with the world.
                                </p>
                                <Button onClick={() => setActiveTab("post")}>Create Your First Blog</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <StaggerItem key={blog.id}>
                                    <Card className="overflow-hidden h-full">
                                        <div className="relative h-48">
                                            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                                            <CardDescription>{blog.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-3">{blog.description}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/blogs/${blog.id}`}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Link>
                                            </Button>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditClick(blog)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(blog.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}
                </TabsContent>
            </Tabs>

            {/* Edit Blog Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Edit Blog Post</DrawerTitle>
                        <DrawerDescription>Make changes to your blog post here.</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 py-2">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="edit-title">Blog Title</Label>
                                <Input id="edit-title" name="title" value={editBlog.title} onChange={handleEditBlogChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Blog Description</Label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    className="min-h-[200px]"
                                    value={editBlog.description}
                                    onChange={handleEditBlogChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Blog Image</Label>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="relative w-full h-[200px] bg-muted rounded-md overflow-hidden">
                                        <Image
                                            src={editBlog.image || "/placeholder.svg"}
                                            alt="Blog preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <Button type="button" variant="outline" className="w-full">
                                        <FileImage className="mr-2 h-4 w-4" />
                                        Choose Image
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSaveEdit} disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your blog post.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

