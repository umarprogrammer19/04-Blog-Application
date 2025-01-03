"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const EditAndDeleteHandlers = ({ id }: { id: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return toast.error('File size should be less than 5MB');
            }
            if (!file.type.startsWith('image/')) {
                return toast.error('Please upload a valid image file');
            }
            setImage(file);
        }
    };

    const handleDelete = async () => {
        if (!id) {
            return toast.error("Invalid blog ID. Please try again.");
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return toast.error("You need to login to delete your blogs.");
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`http://localhost:8000/api/v1/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete the blog");
            }

            toast.success("Blog deleted successfully!");
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = async () => {
        if (!id) {
            return toast.error("Invalid blog ID. Please try again.");
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return toast.error("You need to login to delete your blogs.");
        }

        const response = await fetch(`http://localhost:8000/api/v1/edit/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete the blog");
        }

    }
    return (
        <div className="flex items-center space-x-2">
            {/* Edit Drawer */}
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white transition duration-300"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Blog
                    </Button>
                </DrawerTrigger>
                <DrawerContent
                    className="fixed inset-0 flex items-center justify-center w-full p-4"
                >
                    <div className="w-96 h-screen bg-white rounded-lg shadow-lg p-6">
                        <DrawerHeader>
                            <DrawerTitle className="mb-2">Edit Blog</DrawerTitle>
                            <DrawerDescription>Make changes to your blog below.</DrawerDescription>
                        </DrawerHeader>

                        <div className="space-y-4 mt-4">
                            {/* Title Input */}
                            <div>
                                <Label className="block text-sm font-medium text-gray-700">Title</Label>
                                <Input
                                    type="text"
                                    className="border-2 p-3 mt-1 block w-full rounded-md border-zinc-950 shadow-sm sm:text-sm"
                                    placeholder="Enter blog title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <Label className="block text-sm font-medium text-gray-700">Description</Label>
                                <Textarea
                                    className="border-2 p-3 mt-1 block w-full rounded-md border-zinc-950 shadow-sm sm:text-sm resize-none"
                                    rows={4}
                                    placeholder="Enter blog description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label className="block text-sm font-medium text-gray-700">Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                />
                            </div>
                        </div>

                        <DrawerFooter className="mt-6">
                            <Button onClick={handleEdit}>Make Changes</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="ml-2">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>

            </Drawer>

            {/* Delete Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className={`border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-300 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {isDeleting ? (
                    "Deleting..."
                ) : (
                    <>
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </>
                )}
            </Button>
        </div>
    );
};

export default EditAndDeleteHandlers;
