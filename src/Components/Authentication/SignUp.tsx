"use client";

import { FadeIn } from "@/Components/Home/animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/Button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Github, Mail, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        image: "/placeholder.svg?height=100&width=100&text=User",
    });
    const [imageFile, setImageFile] = useState(null);

    const fileInputRef: any = useRef(null);
    const router = useRouter();

    // **Handle input changes for text fields**
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // **Trigger the hidden file input**
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // **Handle image upload with validation**
    const handleImageChange = (event: any) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                return;
            }
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload a valid image file");
                return;
            }
            setFormData((prev) => ({
                ...prev,
                image: URL.createObjectURL(file),
            }));
            setImageFile(file);
        }
    };

    // **Handle form submission with validation and API call**
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validation
        if (!formData.fullName.trim()) {
            toast.error("Full Name is required");
            return;
        }
        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Invalid email format");
            return;
        }
        if (!formData.password) {
            toast.error("Password is required");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password should be at least 6 characters long");
            return;
        }
        if (!imageFile) {
            toast.error("Please upload an image");
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading("Registering user...", {
            description: "Please wait...",
        });

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("fullname", formData.fullName);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("image", imageFile);

            const response = await fetch("http://localhost:8000/user/signup", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success("User registered successfully!");
                router.push("/login");
            } else {
                const data = await response.json();
                toast.error(data.message || "An error occurred");
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
        <div className="flex min-h-screen">
            {/* Right Side - Form */}
            <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto lg:w-1/2">
                <FadeIn>
                    <div className="flex flex-col space-y-2 text-center mb-8">
                        <Link href="/" className="mx-auto">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Insight
                            </span>
                        </Link>
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your information to get started
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={formData.image} alt="Profile" />
                                        <AvatarFallback>
                                            {formData.fullName ? formData.fullName.charAt(0) : "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button type="button" variant="outline" size="sm" onClick={handleUploadClick}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Image
                                    </Button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        disabled={isLoading}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Password must be at least 6 characters long
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" required />
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the{" "}
                                        <Link href="#" className="text-primary underline-offset-4 hover:underline">
                                            terms of service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="#" className="text-primary underline-offset-4 hover:underline">
                                            privacy policy
                                        </Link>
                                    </Label>
                                </div>
                                <Button disabled={isLoading} className="mt-2">
                                    {isLoading ? "Creating account..." : "Create Account"}
                                </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" disabled={isLoading}>
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline" disabled={isLoading}>
                                <Mail className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}