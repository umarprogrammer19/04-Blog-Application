"use client";
import React, { useEffect } from 'react'
import { toast } from 'sonner';

function UserBlogs() {
    useEffect(() => {
        (async () => {
            const getToken = localStorage.getItem('accessToken');
            if (!getToken) return toast.error('You need to login to See Your blog');
            const userBlogs = await fetch("http://localhost:8000/api/v1/userBlog", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            });

            const data = await userBlogs.json();
            // if (!data) return;
            console.log(data);
        })()
    }, [])

    return (
        <div>UserBlogs</div>
    )
}

export default UserBlogs