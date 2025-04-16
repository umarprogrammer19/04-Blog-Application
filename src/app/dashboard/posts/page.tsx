"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent } from "@/Components/ui/tabs";
import { Edit, Eye, MoreVertical, PenSquare, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditBlogDrawer from "./EditBlogDrawer";

interface Post {
    _id: string;
    title: string;
    description: string;
    quotes: string;
    conclusion: string;
    category: string;
    subsections: { subtitle: string; subdescription: string }[];
    excerpt: string;
    status: string;
    date: string;
    views: number;
    comments: number;
    imageURL: string;
    like: any[];
};

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [editPost, setEditPost] = useState<Post | null>(null); // post to be edited
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Fetch posts from the backend API
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/userBlog", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (!res.ok) {
                throw new Error("Error fetching posts");
            }
            const data = await res.json();
            setPosts(data.userBlogs);
        } catch (error: any) {
            console.error("Failed to fetch posts", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Toggle selection for a single post
    const togglePostSelection = (postId: string) => {
        if (selectedPosts.includes(postId)) {
            setSelectedPosts(selectedPosts.filter((id) => id !== postId));
        } else {
            setSelectedPosts([...selectedPosts, postId]);
        }
    };
    // Delete a single post
    const deletePost = async (postId: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`http://localhost:8000/api/v1/delete/${postId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            // Refresh posts after deletion
            fetchPosts();
        } catch (error: any) {
            console.error("Failed to delete post", error);
            alert("Failed to delete post: " + error.message);
        }
    };

    // Delete multiple selected posts
    const deleteSelectedPosts = async () => {
        if (!confirm("Are you sure you want to delete all selected posts?")) return;
        try {
            await Promise.all(
                selectedPosts.map((postId) =>
                    fetch(`http://localhost:8000/api/v1/delete/${postId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                        credentials: "include",
                    })
                )
            );
            setSelectedPosts([]);
            fetchPosts();
        } catch (error: any) {
            console.error("Failed to delete selected posts", error);
            alert("Error deleting selected posts: " + error.message);
        }
    };

    // Filtering logic by status and search term
    const filteredPosts = posts.filter((post) => {
        const matchesStatus = filterStatus === "all" || post.status === filterStatus;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Open the edit drawer and set the blog to edit.
    const openEditDrawer = (post: Post) => {
        setEditPost(post);
        setIsDrawerOpen(true);
    };

    // Close the edit drawer and refresh posts if needed.
    const closeEditDrawer = () => {
        setIsDrawerOpen(false);
        setEditPost(null);
        // Optionally refresh your posts list after an edit:
        fetchPosts();
    };

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
                            <Input
                                type="search"
                                placeholder="Search posts..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
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
                                    <CardTitle className="text-base">All Posts ({filteredPosts.length})</CardTitle>
                                    {selectedPosts.length > 0 && (
                                        <div className="ml-auto flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">{selectedPosts.length} selected</span>
                                            <Button variant="outline" size="sm" onClick={deleteSelectedPosts}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {isLoading ? (
                                    <p className="p-4 text-center">Loading posts...</p>
                                ) : filteredPosts.length === 0 ? (
                                    <p className="p-4 text-center">No posts found.</p>
                                ) : (
                                    <div className="divide-y">
                                        {filteredPosts.map((post) => (
                                            <div key={post._id} className="flex items-center gap-4 p-4">
                                                <div className="hidden sm:block">
                                                    <Image
                                                        src={post.imageURL || "/placeholder.svg"}
                                                        alt={post.title}
                                                        width={100}
                                                        height={60}
                                                        className="rounded-md object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-medium truncate">{post.title}</h3>
                                                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                                            {post.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                                                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                        <span>{post.date}</span>
                                                        <span>{post.category}</span>
                                                        {post.status === "published" && <span>{post.comments} comments</span>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {post.status === "published" && (
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={`/blogs/${post._id}`}>
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDrawer(post)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => deletePost(post._id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
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
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {isDrawerOpen && editPost && (
                <EditBlogDrawer post={editPost} onClose={closeEditDrawer} />
            )}
        </div>
    );
}
