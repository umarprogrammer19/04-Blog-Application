"use client";

import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { ArrowUpToLine, Plus, Trash } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";

const CreatePostPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quotes, setQuotes] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [subsections, setSubsections] = useState<
        Array<{ subtitle: string; subdescription: string }>
    >([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Add an empty subsection field
    const addSubsection = () => {
        // Allow up to 5 subsections only
        if (subsections.length < 5) {
            setSubsections([...subsections, { subtitle: "", subdescription: "" }]);
        }
    };

    // Remove a subsection at the given index
    const removeSubsection = (index: number) => {
        const updated = subsections.filter((_, i) => i !== index);
        setSubsections(updated);
    };

    // Update a subsection field
    const handleSubsectionChange = (
        index: number,
        field: "subtitle" | "subdescription",
        value: string
    ) => {
        const updated = [...subsections];
        updated[index] = { ...updated[index], [field]: value };
        setSubsections(updated);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quotes", quotes);
        formData.append("conclusion", conclusion);
        formData.append("category", category);

        // Append subsections as a JSON string
        formData.append("subsections", JSON.stringify(subsections));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch(`http://localhost:8000/api/v1/addblog`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error posting blog");
            }

            // Redirect or update the UI as needed
            window.location.href = "/dashboard/posts";
        } catch (error: any) {
            console.error("Error submitting post:", error);
            alert("Error submitting post: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
                <p className="text-muted-foreground">
                    Write and publish a new blog post to your audience.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    {/* Title */}
                    <div className="grid gap-3">
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter a descriptive title"
                            className="text-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Write your post content..."
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Quotes */}
                    <div className="grid gap-3">
                        <Label htmlFor="quotes">Quotes</Label>
                        <Input
                            id="quotes"
                            placeholder="Enter quotes (optional)"
                            value={quotes}
                            onChange={(e) => setQuotes(e.target.value)}
                        />
                    </div>

                    {/* Conclusion */}
                    <div className="grid gap-3">
                        <Label htmlFor="conclusion">Conclusion</Label>
                        <Textarea
                            id="conclusion"
                            placeholder="Write your conclusion (optional)"
                            rows={3}
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={(val) => setCategory(val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Development">Development</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                                <SelectItem value="Branding">Branding</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Featured Image */}
                    <div className="grid gap-3">
                        <Label htmlFor="image">Featured Image</Label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="border border-dashed border-muted-foreground/25 rounded-md p-2"
                        />
                    </div>

                    {/* Subsections */}
                    <div className="grid gap-3">
                        <Label>Subsections</Label>
                        {subsections.map((sub, index) => (
                            <div key={index} className="flex flex-col gap-2 border rounded p-2">
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
                                    onChange={(e) => handleSubsectionChange(index, "subtitle", e.target.value)}
                                />
                                <Textarea
                                    placeholder="Sub description"
                                    rows={2}
                                    value={sub.subdescription}
                                    onChange={(e) =>
                                        handleSubsectionChange(index, "subdescription", e.target.value)
                                    }
                                />
                            </div>
                        ))}
                        {subsections.length < 5 && (
                            <Button type="button" variant="outline" onClick={addSubsection}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Subsection
                            </Button>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-36 ms-auto">
                        <ArrowUpToLine className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Publishing..." : "Publish Post"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage;
