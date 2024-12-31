import React from 'react';
import Cards from './Cards';

export interface BlogType {
    _id: string;
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
}

async function ShowBlogs() {
    const fetchBlogs = await fetch("http://localhost:8000/api/v1/blogs");
    const { blogs } = await fetchBlogs.json();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((card: BlogType) => <Cards {...card} key={card._id} />)}
        </div>
    )
}

export default ShowBlogs