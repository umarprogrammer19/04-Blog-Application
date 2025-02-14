"use client"

import { useState } from "react"
import { toast } from "sonner"

const CommentSection = ({ blogId }: { blogId: string }) => {
    const [comments, setComments] = useState<any>([])
    const [newComment, setNewComment] = useState<string>("")

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/api/v2/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    blogId: blogId,
                    content: newComment,
                }),

            })
            const data = await response.json()
            console.log(data);
            if (response.ok) {
                setComments([...comments, data.populatedComment])
                setNewComment("")
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message);
        }
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
            <form onSubmit={handleSubmitComment} className="mb-8">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                />
                <button
                    type="submit"
                    className="mt-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                >
                    Post Comment
                </button>
            </form>
            <div className="space-y-4">
                {comments.map((comment: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-800">{comment.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            By {comment.userId.fullname} on {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentSection

