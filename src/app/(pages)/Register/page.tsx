"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const getFullName = useRef<HTMLInputElement>(null);
  const getEmail = useRef<HTMLInputElement>(null);
  const getPassword = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Handle image upload and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullname = getFullName.current?.value.trim();
    const email = getEmail.current?.value.trim();
    const password = getPassword.current?.value.trim();

    if (!fullname) return toast.error("Full Name is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: getFullName.current?.value,
          email: getEmail.current?.value,
          password: getPassword.current?.value
        }),
      });

      if (response.status === 200) {
        toast.success("User registered successfully!");
        router.push("/Login");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage || "Failed to register user");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration");
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
            className="w-full bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-violet-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/Login" className="text-violet-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
