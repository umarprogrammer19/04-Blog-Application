"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Label } from "@/Components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs"
import { Switch } from "@/Components/ui/switch"
import { Image, Link2, FileImage, Save, Eye, ArrowUpToLine } from "lucide-react"

export default function CreatePostPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState("write")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            // Redirect to posts page after successful submission
            window.location.href = "/dashboard/posts"
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
                <p className="text-muted-foreground">
                    Write and publish a new blog post to your audience.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter a descriptive title"
                            className="text-lg"
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Write a short summary of your post"
                            className="resize-none"
                            rows={2}
                        />
                        <p className="text-xs text-muted-foreground">
                            This will be displayed on the blog listing page. If left empty, the
                            first few sentences of your post will be used.
                        </p>
                    </div>

                    <div className="grid gap-3">
                        <Label>Featured Image</Label>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="h-[200px] w-full bg-muted rounded-md flex flex-col items-center justify-center border border-dashed border-muted-foreground/25">
                                        <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            Drag and drop an image, or click to browse
                                        </p>
                                    </div>
                                    <Button type="button" variant="outline" className="w-full">
                                        <FileImage className="mr-2 h-4 w-4" />
                                        Choose Image
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing Options</CardTitle>
                            <CardDescription>
                                Configure how and when your post will be published.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="comments">Allow Comments</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Let readers comment on your post.
                                    </p>
                                </div>
                                <Switch id="comments" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="featured">Featured Post</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Display this post in the featured section.
                                    </p>
                                </div>
                                <Switch id="featured" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="seo">SEO Optimization</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Optimize this post for search engines.
                                    </p>
                                </div>
                                <Switch id="seo" defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <div className="flex gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    <ArrowUpToLine className="mr-2 h-4 w-4" />
                                    {isSubmitting ? "Publishing..." : "Publish Post"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    )
}
