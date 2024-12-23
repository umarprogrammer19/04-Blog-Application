"use client";

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
  const validateInputs = () => {
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

    const loadingToast = toast("Registering user...", {
      description: "Please wait...",
      duration: Infinity,
    });

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: getFullName.current?.value,
          email: getEmail.current?.value,
          password: getPassword.current?.value,
        }),
      });

      if (response.status === 200) {
        toast.success("User registered successfully!");
        router.push("/Login");
      } else {
        const { message } = await response.json();
        toast.error(message);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-6 text-violet-700">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            ref={getFullName}
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            ref={getEmail}
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
            ref={getPassword}
          />

          {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
                className="w-32 h-32 object-cover mx-auto mt-4 rounded-md"
              />
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className={`w-full bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-violet-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/Login" className="text-violet-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
