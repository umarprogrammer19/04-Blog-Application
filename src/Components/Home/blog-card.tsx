"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { cn } from "@/lib/utils"

interface BlogCardProps {
    id: string
    title: string
    excerpt: string
    category: string
    date: string
    author: {
        name: string
        image: string
    }
    image: string
    likes: number
    comments: number
    className?: string
    variant?: "default" | "horizontal"
}

export default function BlogCard({
    id,
    title,
    excerpt,
    category,
    date,
    author,
    image,
    likes,
    comments,
    className,
    variant = "default",
}: BlogCardProps) {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes)

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (liked) {
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
        }
        setLiked(!liked)
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
            <Link href={`/blogs/${id}`} className="block h-full w-full">
                <div className={cn("relative", variant === "horizontal" ? "md:w-1/3" : "w-full")}>
                    <div className="aspect-video overflow-hidden">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            width={600}
                            height={340}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <Badge className="absolute left-3 top-3 bg-primary/80 hover:bg-primary" variant="secondary">
                        {category}
                    </Badge>
                </div>
                <div className={cn("flex flex-col justify-between p-5", variant === "horizontal" ? "md:w-2/3" : "")}>
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                            {title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{excerpt}</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={author.image} alt={author.name} />
                                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{author.name}</span>
                                    <span className="text-xs text-muted-foreground">{date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike}>
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
                                <span className="text-xs text-muted-foreground">{comments}</span>
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

