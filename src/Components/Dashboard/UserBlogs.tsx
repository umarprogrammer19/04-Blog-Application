"use client";
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { BlogCard } from './UserBlogCard';
interface Blog {
    _id: string;
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    userRef: {
        _id: string;
        fullname: string;
        email: string;
        imageURL: string;
    };
}
function UserBlogs() {
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken)
                return toast.error("You need to login to see your blogs.");

            try {
                const response = await fetch("http://localhost:8000/api/v1/userBlog", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch blogs");
                }

                const data = await response.json();
                setUserBlogs(data.userBlogs || []);
            } catch (error) {
                toast.error("An error occurred while fetching blogs.");
            }
        };

        fetchUserBlogs();
    }, [userBlogs]);



    return (
        <div className="w-[80%] mx-auto space-y-8">
            {userBlogs.length === 0 ? (
                <p className="text-center text-gray-500">No blogs available.</p>
            ) : (
                userBlogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        userName={blog.userRef.fullname || "Unknown User"}
                        userAvatar={blog.userRef.imageURL}
                        blogTitle={blog.title}
                        blogDescription={blog.description}
                        postedAt={new Date(blog.createdAt)}
                        onDelete={() => console.log("Delete")}
                        onEdit={() => console.log("Edit")}
                    />
                ))
            )}
        </div>
    )
}

export default UserBlogs