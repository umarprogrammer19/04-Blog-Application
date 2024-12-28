"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { ImagePlus, Pencil } from 'lucide-react';
import { toast } from 'sonner';

function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return toast.error('File size should be less than 5MB');
      }
      if (!file.type.startsWith('image/')) {
        return toast.error('Please upload a valid image file');
      }
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      return toast.error('Title is required');
    }
    if (!description.trim()) {
      return toast.error('Description is required');
    }
    if (!image) {
      return toast.error('Please upload an image');
    }

    const loadingToast = toast('Publishing blog...', {
      description: 'Please wait...',
      duration: Infinity,
    });

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);

      const response = await fetch('http://localhost:8000/api/v1/addBlog', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Blog published successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
        setImagePreview('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during blog publishing');
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

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
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter your post title..."
              className="w-full mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Content
            </Label>
            <Textarea
              id="description"
              placeholder="Write your post content here..."
              className="w-full min-h-[100px] mt-1"
              value={description}
              rows={6}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="image-upload" className="text-sm font-medium text-gray-700">
              Add Photo/Video
            </Label>
            <div className="mt-1 flex items-center">
              <Button variant="outline" className="mr-2" onClick={openFileInput}>
                <ImagePlus className="w-5 h-5 mr-2" />
                Choose File
              </Button>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {image && (
                <span className="text-sm text-gray-500 truncate max-w-[200px]">
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
                  <img src={imagePreview} alt="Selected" className="h-full w-full object-cover" />
                </span>
                <Button
                  type="button"
                  onClick={openFileInput}
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
          <Button
            className={`bg-violet-700 hover:bg-transparent hover:text-violet-700 border border-purple-700 text-white px-5 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handlePublish}
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'PUBLISH'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
