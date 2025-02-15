import React from "react";
import Cards from "./Cards";

export interface BlogType {
    _id: string;
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    like: string[];
}

async function ShowBlogs({ show = 3 }: { show?: number }) {
    try {
        const res = await fetch("http://localhost:8000/api/v1/blogs", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs.");
        }

        const { blogs } = await res.json();

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.slice(0, show).map((card: BlogType) => (
                    <Cards {...card} key={card._id} />
                ))}
            </div>
        );
    } catch (error) {
        return <p className="text-red-500 text-center">Error loading blogs.</p>;
    }
}

export default ShowBlogs;
