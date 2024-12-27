"use client";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { FileInput } from "@/Components/ui/FileInput";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFullName = useRef<HTMLInputElement>(null);
  const getEmail = useRef<HTMLInputElement>(null);
  const getPassword = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("File size should be less than 5MB");
      }
      if (!file.type.startsWith("image/")) {
        return toast.error("Please upload a valid image file");
      }
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Input Validation for Email and Password
  const validateInputs = (): string | null => {
    const fullname = getFullName.current?.value.trim();
    const email = getEmail.current?.value.trim();
    const password = getPassword.current?.value.trim();

    if (!fullname) return "Full Name is required";
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (password.length < 6) return "Password should be at least 6 characters long";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateInputs();
    if (validationError) return toast.error(validationError);

    if (!imageFile) return toast.error("Please upload an image");

    const loadingToast = toast("Registering user...", {
      description: "Please wait...",
      duration: Infinity,
    });

    setIsLoading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("fullname", getFullName.current?.value || "");
      formData.append("email", getEmail.current?.value || "");
      formData.append("password", getPassword.current?.value || "");
      formData.append("image", imageFile);

      // Send the request
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        toast.success("User registered successfully!");
        router.push("/Login");
      } else {
        const { messaage } = await response.json();
        toast.error(messaage || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-violet-700">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" ref={getFullName} placeholder="Full Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" ref={getEmail} placeholder="Email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" ref={getPassword} placeholder="Password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Upload Profile Image</Label>
              <FileInput id="image" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-transparent border border-purple-700 hover:text-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Already have an account?{" "}
            <Link href="/Login" className="text-violet-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
