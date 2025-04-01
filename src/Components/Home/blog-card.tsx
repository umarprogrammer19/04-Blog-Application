"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { cn } from "@/lib/utils"

interface BlogCardProps {
    _id: string
    title: string
    description: string
    createdAt?: string
    imageURL?: string
    likesCount: number
    comments: any[]
    className?: string
    variant?: "default" | "horizontal"
    userRef: {
        fullname: string
        imageURL: string
    }
}

export default function BlogCard({
    _id,
    title,
    description,
    likesCount,
    createdAt,
    imageURL,
    comments,
    className,
    variant = "default",
    userRef,
}: BlogCardProps) {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likesCount)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v2/blog/${_id}/isLiked`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                const result = await response.json()
                if (response.ok) {
                    setLiked(result.isLiked)
                } else {
                    console.error(result.message || "Failed to fetch like status.")
                }
            } catch (error) {
                console.error("Error fetching like status:", error)
            }
        }

        fetchIsLiked()
    }, [_id])

    const toggleLike = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isProcessing) return

        setIsProcessing(true)
        try {
            const response = await fetch("http://localhost:8000/api/v2/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ blogId: _id }),
            })
            const result = await response.json()
            if (response.ok) {
                if (result.isLiked) {
                    setLikeCount((prev) => prev + 1)
                } else {
                    setLikeCount((prev) => prev - 1)
                }
                setLiked(result.isLiked)
            } else {
                alert(result.message || "Something went wrong.")
            }
        } catch (error) {
            console.error("Error liking/unliking blog:", error)
            alert("An error occurred. Please try again later.")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                variant === "horizontal" ? "flex flex-col md:flex-row" : "",
                className,
            )}
        >
            <Link href={`/blogs/${_id}`} className="block h-full w-full">
                <div className={cn("relative", variant === "horizontal" ? "md:w-1/3" : "w-full")}>
                    <div className="aspect-video overflow-hidden">
                        <Image
                            src={imageURL || "/placeholder.svg"}
                            alt={title}
                            width={600}
                            height={340}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <Badge className="absolute left-3 top-3 bg-primary/80 hover:bg-primary" variant="secondary">
                        {"Design"}
                    </Badge>
                </div>
                <div className={cn("flex flex-col justify-between p-5", variant === "horizontal" ? "md:w-2/3" : "")}>
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                            {title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{description}</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={userRef?.imageURL} alt={userRef?.fullname} />
                                    <AvatarFallback>{userRef?.fullname[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{userRef?.fullname}</span>
                                    <span className="text-xs text-muted-foreground">{createdAt?.slice(0, 10)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLike}>
                                    <Heart
                                        className={cn(
                                            "h-4 w-4 transition-colors",
                                            liked ? "fill-primary text-primary" : "text-muted-foreground",
                                        )}
                                    />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <span className="text-xs text-muted-foreground">{likeCount}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Comment</span>
                                </Button>
                                <span className="text-xs text-muted-foreground">{comments?.length}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Share2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
