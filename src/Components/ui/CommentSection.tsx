"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Textarea } from "./textarea";
import { Button } from "./Button";
import { FadeIn, StaggerContainer, StaggerItem } from "../Home/animation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface Comment {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    imageURL: string;
  };
  content: string;
  createdAt: string;
  // Optional replies property for nested replies
  replies?: Comment[];
}

interface CommentSectionProps {
  blogId: string;
  comments: Comment[];
}

const CommentSection = ({ blogId, comments }: CommentSectionProps) => {
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // State for reply functionality - tracks the comment id being replied to and its content
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [replyLoading, setReplyLoading] = useState<boolean>(false);

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

  const handleReplyButtonClick = (commentId: string) => {
    // Toggle reply form for the given comment
    if (activeReplyCommentId === commentId) {
      setActiveReplyCommentId(null);
      setReplyText("");
    } else {
      setActiveReplyCommentId(commentId);
      setReplyText("");
    }
  };

  const handleSubmitReply = async (parentCommentId: string) => {
    if (!replyText.trim()) return toast.error("Reply cannot be empty.");
    
    setReplyLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v2/comments/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          parentCommentId,
          content: replyText,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // The API returns the newly created reply; update the comment's replies list in state.
      setAllComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === parentCommentId) {
            const updatedReplies = comment.replies ? [...comment.replies, data.reply] : [data.reply];
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        })
      );
      toast.success("Reply added successfully!");
      // Reset reply UI
      setActiveReplyCommentId(null);
      setReplyText("");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <section className="p-10 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-6">Comments ({allComments?.length})</h2>

          {/* Comment Form */}
          <div className="mb-8 p-6 bg-background rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="mb-4 min-h-[100px]"
            />
            <Button disabled={loading} onClick={handleSubmitComment}>
              {loading ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </FadeIn>

        {/* Comments List */}
        <StaggerContainer className="space-y-6">
          {allComments?.map((comment, index) => (
            <StaggerItem key={comment._id || index}>
              <div className="space-y-4">
                <div className="p-6 bg-background rounded-xl flex justify-between items-start shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={comment.userId.imageURL} alt={comment.userId.fullname} />
                      <AvatarFallback>{comment.userId.fullname.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {comment.userId.fullname.charAt(0).toUpperCase() +
                              comment.userId.fullname.slice(1).toLowerCase()}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{comment.content}</p>

                      {/* Render Replies if any */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4 border-l-2 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="p-4 bg-background rounded shadow-sm">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={reply.userId.imageURL} alt={reply.userId.fullname} />
                                  <AvatarFallback>{reply.userId.fullname.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h5 className="font-semibold">
                                    {reply.userId.fullname.charAt(0).toUpperCase() +
                                      reply.userId.fullname.slice(1).toLowerCase()}
                                  </h5>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-2">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {userId === comment.userId?._id && (
                    <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                {/* Reply Button and Form */}
                {userId && (
                  <div className="ml-12">
                    <button
                      onClick={() => handleReplyButtonClick(comment._id)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Reply
                    </button>

                    {activeReplyCommentId === comment._id && (
                      <div className="mt-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="mb-2 min-h-[80px]"
                        />
                        <Button disabled={replyLoading} onClick={() => handleSubmitReply(comment._id)}>
                          {replyLoading ? "Posting..." : "Post Reply"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CommentSection;
