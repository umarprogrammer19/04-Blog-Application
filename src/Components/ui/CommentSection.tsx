"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Comment {
    _id: string;
    userId: {
        fullname: string;
    };
    content: string;
    createdAt: string;
}

const CommentSection = ({ blogId, comments }: { blogId: string; comments: Comment[] }) => {
    const [allComments, setAllComments] = useState<Comment[]>(comments);
    const [newComment, setNewComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return toast.error("Comment cannot be empty.");

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v2/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    blogId: blogId,
                    content: newComment,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Add new comment to the state and clear the input
            setAllComments((prev) => [...prev, data.comment]);
            setNewComment("");
            toast.success("Comment added successfully!");
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

            {/* Comment Form */}
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
                    disabled={loading}
                    className={`mt-2 bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
                        }`}
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {/* Display Comments */}
            <div className="space-y-4">
                {allComments.length > 0 ? (
                    allComments.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
                            <p className="text-gray-800">{comment.content}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                By {comment.userId?.fullname || "Anonymous"} on{" "}
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
