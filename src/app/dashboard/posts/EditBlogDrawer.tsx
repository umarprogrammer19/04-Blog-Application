"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { PenSquare, ArrowUpToLine, Trash } from "lucide-react";
import Image from "next/image";

interface EditBlogDrawerProps {
    post: {
        _id: string;
        title: string;
        description: string;
        quotes: string;
        conclusion: string;
        category: string;
        subsections: Array<{ subtitle: string; subdescription: string }>;
        imageURL: string;
    };
    onClose: () => void;
}

const EditBlogDrawer: React.FC<EditBlogDrawerProps> = ({ post, onClose }) => {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [quotes, setQuotes] = useState(post.quotes);
    const [conclusion, setConclusion] = useState(post.conclusion);
    const [category, setCategory] = useState(post.category);
    const [subsections, setSubsections] = useState(post.subsections || []);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle image file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Subsection management
    const addSubsection = () => {
        if (subsections.length < 5) {
            setSubsections([...subsections, { subtitle: "", subdescription: "" }]);
        }
    };

    const removeSubsection = (index: number) => {
        setSubsections(subsections.filter((_, i) => i !== index));
    };

    const handleSubsectionChange = (index: number, field: "subtitle" | "subdescription", value: string) => {
        const updated = [...subsections];
        updated[index] = { ...updated[index], [field]: value };
        setSubsections(updated);
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quotes", quotes);
        formData.append("conclusion", conclusion);
        formData.append("category", category);
        formData.append("subsections", JSON.stringify(subsections));
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch(`http://localhost:8000/api/v1/edit/${post._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            onClose(); // Close drawer on success
        } catch (error: any) {
            console.error("Error updating blog:", error);
            alert("Error updating blog: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // A fixed drawer container that slides in from the right.
        <div className="fixed inset-0 z-50 flex">
            {/* The overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* The drawer content */}
            <div className="relative ml-auto h-full w-full max-w-md bg-gray-950 shadow-lg transition-transform transform">
                <div className="flex h-full flex-col">
                    <div className="border-b p-4">
                        <h2 className="text-xl font-semibold">Edit Post</h2>
                        <p className="text-sm text-gray-500">
                            Update the details of your blog post.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-quotes">Quotes</Label>
                            <Input
                                id="edit-quotes"
                                value={quotes}
                                onChange={(e) => setQuotes(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-conclusion">Conclusion</Label>
                            <Textarea
                                id="edit-conclusion"
                                value={conclusion}
                                onChange={(e) => setConclusion(e.target.value)}
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-category">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="edit-image">Featured Image</Label>
                            <input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border border-dashed rounded p-2 w-full"
                            />
                            {post.imageURL && (
                                <div className="mt-2">
                                    <Image
                                        src={post.imageURL}
                                        alt={post.title}
                                        width={100}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <Label>Subsections</Label>
                            {subsections.map((sub, index) => (
                                <div key={index} className="flex flex-col gap-2 border rounded p-2 mb-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Subsection {index + 1}</span>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeSubsection(index)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Input
                                        placeholder="Subheading"
                                        value={sub.subtitle}
                                        onChange={(e) =>
                                            handleSubsectionChange(index, "subtitle", e.target.value)
                                        }
                                    />
                                    <Textarea
                                        placeholder="Sub description"
                                        value={sub.subdescription}
                                        onChange={(e) =>
                                            handleSubsectionChange(index, "subdescription", e.target.value)
                                        }
                                        rows={2}
                                    />
                                </div>
                            ))}
                            {subsections.length < 5 && (
                                <Button type="button" variant="outline" onClick={addSubsection}>
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Add Subsection
                                </Button>
                            )}
                        </div>
                    </form>
                    <div className="border-t p-4">
                        <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                            <ArrowUpToLine className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlogDrawer;
