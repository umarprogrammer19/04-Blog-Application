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
import PostsPage from "./posts/page"
import CreatePostPage from "./create/page"

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
                    <PostsPage />
                </TabsContent>

                <TabsContent value="blogs" className="mt-6">
                    <CreatePostPage />
                </TabsContent>
            </Tabs>
        </div>
    )
}

