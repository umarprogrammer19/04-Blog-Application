"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { FadeIn, StaggerContainer, StaggerItem } from "../Home/animation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface Comment {
    _id: string;
    userId: {
        _id: string;
        fullname: string;
        imageURL: string
    };
    content: string;
    createdAt: string;
}

const CommentSection = ({ blogId, comments }: { blogId: string; comments: Comment[] }) => {
    const [allComments, setAllComments] = useState<Comment[]>(comments);
    const [newComment, setNewComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("current_user_id");
        if (storedUserId) setUserId(storedUserId);
    }, []);

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

    const handleDeleteComment = async (commentId: string) => {
        if (!userId) return toast.error("User not authenticated.");
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const response = await fetch("http://localhost:8000/api/v2/comment/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ commentId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Remove the deleted comment from the state
            setAllComments((prev) => prev.filter((comment) => comment._id !== commentId));
            toast.success("Comment deleted successfully!");
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        // <div className="mt-12">
        //     <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

        //     {/* Comment Form */}
        //     <form onSubmit={handleSubmitComment} className="mb-8">
        //         <textarea
        //             value={newComment}
        //             onChange={(e) => setNewComment(e.target.value)}
        //             placeholder="Write your comment here..."
        //             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        //             rows={4}
        //         />
        //         <button
        //             type="submit"
        //             disabled={loading}
        //             className={`mt-2 bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        //                 }`}
        //         >
        //             {loading ? "Posting..." : "Post Comment"}
        //         </button>
        //     </form>

        //     {/* Display Comments */}
        //     <div className="space-y-4">
        //         {allComments.length > 0 ? (
        //             allComments.map((comment) => (
        //                 <div key={comment._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        //                     <div>
        //                         <p className="text-gray-800">{comment.content}</p>
        //                         <p className="text-sm text-gray-500 mt-2">
        //                             By {comment.userId?.fullname || "Anonymous"} on{" "}
        //                             {new Date(comment.createdAt).toLocaleDateString()}
        //                         </p>
        //                     </div>

        //                     {userId === comment.userId?._id && (
        //                         <button
        //                             onClick={() => handleDeleteComment(comment._id)}
        //                             className="text-red-500 hover:text-red-700"
        //                         >
        //                             <Trash2 size={20} />
        //                         </button>
        //                     )}
        //                 </div>
        //             ))
        //         ) : (
        //             <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        //         )}
        //     </div>
        // </div>
        // <div className="mb-8 p-6 bg-background rounded-xl shadow-sm">
        //     <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
        // <Textarea
        //     value={newComment}
        //     onChange={(e) => setNewComment(e.target.value)}
        //     placeholder="Share your thoughts..."
        //     className="mb-4 min-h-[100px]" />
        //     <Button
        //         disabled={loading}
        //         onClick={handleSubmitComment}
        //     >{loading ? "Posting..." : "Post Comment"}</Button>
        // </div>
        <section className="p-10 bg-muted/30">
            <div className="container max-w-4xl mx-auto">
                <FadeIn>
                    <h2 className="text-2xl font-bold mb-6">Comments ({comments?.length})</h2 >

                    {/* Comment Form */}
                    <div className="mb-8 p-6 bg-background rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="mb-4 min-h-[100px]" />
                        <Button
                            disabled={loading}
                            onClick={handleSubmitComment}
                        >{loading ? "Posting..." : "Post Comment"}</Button>
                    </div>
                </FadeIn>

                {/* Comments List */}
                <StaggerContainer className="space-y-6">
                    {allComments?.map((comment) => (
                        <StaggerItem key={comment._id}>
                            <div className="space-y-4">
                                <div className="p-6 bg-background rounded-xl flex justify-between items-start shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src={comment.userId.imageURL} alt={comment.userId.imageURL} />
                                            <AvatarFallback>{comment.userId?.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-semibold">{comment.userId.fullname.charAt(0).toUpperCase() + comment.userId.fullname.slice(1).toLowerCase()}</h4>
                                                    <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="mt-2">{comment.content}</p>
                                        </div>
                                    </div>
                                    {userId === comment.userId?._id && (
                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div >
        </section >
    );
};

export default CommentSection;
