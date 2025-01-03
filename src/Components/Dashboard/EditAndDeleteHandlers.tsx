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

const EditAndDeleteHandlers = ({ id }: { id: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [image, setImage] = useState<File | null>(null);

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
                    <div className="w-96 bg-white rounded-lg shadow-lg p-6">
                        <DrawerHeader>
                            <DrawerTitle className="mb-2">Edit Blog</DrawerTitle>
                            <DrawerDescription>Make changes to your blog below.</DrawerDescription>
                        </DrawerHeader>

                        <div className="space-y-4 mt-4">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="border-2 p-3 mt-1 block w-full rounded-md border-zinc-950 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Enter blog title"
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="border-2 p-3 mt-1 block w-full rounded-md border-zinc-950 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
                                    rows={4}
                                    placeholder="Enter blog description"
                                ></textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
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
