'use client'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import { ImagePlus, Pencil } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

export default function FullScreenBlogPostForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mt-10 bg-gray-100/60 mx-auto shadow-sm rounded-lg overflow-hidden">
                <div className="border-b border-gray-200">
                    <div className="flex items-center space-x-4 px-4 py-3">
                        <Button variant="ghost" className="text-violet-700 hover:text-white hover:bg-violet-700">
                            <Pencil className="w-5 h-5 mr-2" />
                            New Post
                        </Button>
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter your post title..."
                            className="w-full mt-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">Content</Label>
                        <Textarea
                            id="description"
                            placeholder="Write your post Content here..."
                            className="w-full min-h-[100px] mt-1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="image-upload" className="text-sm font-medium text-gray-700">Add Photo/Video</Label>
                        <div className="mt-1 flex items-center">
                            <Label htmlFor="image-upload" className="cursor-pointer">
                                <Button variant="outline" className="mr-2">
                                    <ImagePlus className="w-5 h-5 mr-2" />
                                    Choose File
                                </Button>
                            </Label>
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            {image && (
                                <span className="text-sm text-gray-500">
                                    {image.name}
                                </span>
                            )}
                        </div>
                    </div>
                    {image && (
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Selected Image</Label>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Selected"
                                        className="h-full w-full object-cover"
                                    />
                                </span>
                                <Button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    variant="outline"
                                    className="ml-5"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end px-3 py-3 bg-gray-50">
                    <Button className="bg-violet-700 hover:bg-transparent hover:text-violet-700 border border-purple-700 text-white px-5">
                        PUBLISH
                    </Button>
                </div>
            </div>
        </div>
    )
}

